"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth, useFirestore } from "@/firebase";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { doc } from "firebase/firestore";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  UserCredential
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.598,32.454,48,27.461,48,20C48,17.341,47.862,14.65,47.611,12.083L43.611,20.083z"/>
    </svg>
  )
}

type AuthModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLoginSuccess: () => void;
};

export default function AuthModal({ isOpen, setIsOpen, onLoginSuccess }: AuthModalProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleUserCreation = (userCredential: UserCredential) => {
    const user = userCredential.user;
    const userDocRef = doc(firestore, "users", user.uid);
    const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      creationDate: new Date().toISOString(),
      newsletterSubscribed: true,
    };
    // Use merge:true to avoid overwriting existing data if the user document already exists
    // (e.g., from a previous social login). This also works for creating the document if it doesn't exist.
    setDocumentNonBlocking(userDocRef, userData, { merge: true });
    onLoginSuccess();
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      handleUserCreation(userCredential);
      toast({ title: "¡Bienvenido!", description: "Has iniciado sesión correctamente." });
    } catch (error: any) {
      setError(error.message);
      toast({ variant: "destructive", title: "Error de autenticación", description: error.message });
    }
  };
  
  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess();
        toast({ title: "¡Bienvenido de vuelta!", description: "Has iniciado sesión correctamente." });
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        handleUserCreation(userCredential);
        toast({ title: "¡Registro exitoso!", description: "Tu cuenta ha sido creada." });
      }
    } catch (error: any) {
      setError(error.message);
      toast({ variant: "destructive", title: "Error de autenticación", description: error.message });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card border-border max-w-sm p-8 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center uppercase tracking-wider font-headline">
            {isLoginView ? 'Player Login' : 'Crear Cuenta'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <Button variant="outline" className="h-12 w-full text-base font-semibold border-border bg-input hover:bg-input/80" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-3" />
            Continuar con Google
          </Button>
          <div className="flex items-center gap-4">
            <Separator className="flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">O</span>
            <Separator className="flex-1 bg-border" />
          </div>
          <form onSubmit={handleAuthAction} className="flex flex-col gap-4">
            <Input 
              type="email" 
              placeholder="Email" 
              className="h-12 bg-input border-border focus:border-primary focus:ring-primary" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="Contraseña" 
              className="h-12 bg-input border-border focus:border-primary focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button type="submit" className="h-12 w-full text-base font-bold uppercase bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_hsl(var(--primary))] transition-all">
              {isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            {isLoginView ? '¿Nuevo aquí?' : '¿Ya tienes una cuenta?'}
            {' '}
            <button onClick={() => { setIsLoginView(!isLoginView); setError(null); }} className="text-primary hover:underline font-semibold">
              {isLoginView ? 'Crea tu cuenta' : 'Iniciar Sesión'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
