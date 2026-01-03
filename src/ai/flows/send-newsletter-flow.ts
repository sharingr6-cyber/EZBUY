'use server';
/**
 * @fileOverview A flow to send a weekly newsletter with product offers.
 * 
 * - sendNewsletter - A function that sends the newsletter.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';

// Ensure Firebase Admin is initialized
if (!getApps().length) {
  initializeApp();
}

import { flashSaleProducts, type Product } from '@/lib/data';

const sendNewsletterFlow = ai.defineFlow(
  {
    name: 'sendNewsletterFlow',
    inputSchema: z.void(),
    outputSchema: z.string(),
  },
  async () => {
    const db = getFirestore();
    const usersSnapshot = await db.collection('users')
      .where('newsletterSubscribed', '==', true)
      .get();

    if (usersSnapshot.empty) {
      console.log('No subscribed users found.');
      return 'No subscribed users to send the newsletter to.';
    }

    const offers = flashSaleProducts;
    if (offers.length === 0) {
      console.log('No offers available to send.');
      return 'No offers available in flashSaleProducts.';
    }

    const userEmails = usersSnapshot.docs.map(doc => doc.data().email);
    
    console.log(`Simulating sending newsletter to ${userEmails.length} users.`);
    console.log('Offers:', offers.map(p => p.name));
    console.log('Recipients:', userEmails);

    // In a real application, you would integrate an email sending service here.
    // For example, using a library like Nodemailer or an API like SendGrid.
    //
    // for (const email of userEmails) {
    //   await sendEmail({
    //     to: email,
    //     subject: 'Your Weekly EZBUY Gaming Deals!',
    //     html: generateNewsletterHtml(offers),
    //   });
    // }
    
    return `Successfully simulated sending newsletter to ${userEmails.length} users.`;
  }
);

export async function sendNewsletter(): Promise<string> {
    return sendNewsletterFlow();
}