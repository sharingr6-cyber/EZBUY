
import placeholderData from './placeholder-images.json';

const { placeholderImages } = placeholderData;

const findImage = (id: string) => {
    const img = placeholderImages.find(p => p.id === id);
    if (!img) {
        // Fallback to a default image if not found
        return { src: 'https://picsum.photos/seed/default/400/400', width: 400, height: 400, hint: 'product placeholder' };
    }
    // Extract width and height from picsum URLs
    if (img.imageUrl.includes('picsum.photos')) {
      const parts = img.imageUrl.split('/');
      const width = parseInt(parts[parts.length - 2]);
      const height = parseInt(parts[parts.length - 1]);
      return { src: img.imageUrl, width, height, hint: img.imageHint };
    }
    
    // For unsplash or other images, we might need to rely on stored dimensions if available, or default
    return { src: img.imageUrl, width: 400, height: 400, hint: img.imageHint };
}

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: {
    src: string;
    width: number;
    height: number;
    hint: string;
  };
  gallery?: {
    src: string;
    width: number;
    height: number;
    hint: string;
  }[];
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  sku?: string;
  stock?: number;
  specs?: string[];
};

export const allProducts: Product[] = [
  {
    id: 'gpu-1',
    name: 'GPU NovaCore RTX 4090 OC Edition',
    category: 'Tarjetas Gráficas',
    price: 7199.99,
    originalPrice: 7999.99,
    image: findImage('gpu-1'),
    gallery: [findImage('gpu-1'), findImage('gpu-2'), findImage('gpu-3'), findImage('gpu-4')],
    rating: 5,
    reviewCount: 92,
    sku: 'GPU-NV-4090-OC',
    stock: 15,
    specs: ['24GB GDDR6X', 'PCIe 4.0', 'DLSS 3', 'Ray Tracing']
  },
  {
    id: 'gpu-2',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'Tarjetas Gráficas',
    price: 3999.99,
    image: findImage('gpu-2'),
    gallery: [findImage('gpu-2'), findImage('gpu-1'), findImage('gpu-3'), findImage('gpu-5')],
    rating: 5,
    reviewCount: 85,
    sku: 'GPU-AMD-7900-XTX',
    stock: 22,
    specs: ['24GB GDDR6', 'PCIe 4.0', 'RDNA 3', 'FSR 3']
  },
  {
    id: 'gpu-3',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    category: 'Tarjetas Gráficas',
    price: 3199.99,
    originalPrice: 3399.99,
    image: findImage('gpu-3'),
    gallery: [findImage('gpu-3'), findImage('gpu-1'), findImage('gpu-2'), findImage('gpu-4')],
    rating: 4,
    reviewCount: 112,
    sku: 'GPU-NV-4070-TI',
    stock: 30,
    specs: ['12GB GDDR6X', 'PCIe 4.0', 'DLSS 3', 'Ray Tracing']
  },
  {
    id: 'gpu-4',
    name: 'NVIDIA GeForce RTX 4080 Super',
    category: 'Tarjetas Gráficas',
    price: 4799.99,
    image: findImage('gpu-4'),
    gallery: [findImage('gpu-4'), findImage('gpu-1'), findImage('gpu-2'), findImage('gpu-3')],
    rating: 5,
    reviewCount: 68,
    sku: 'GPU-NV-4080-S',
    stock: 18,
    specs: ['16GB GDDR6X', 'PCIe 4.0', 'DLSS 3', 'Ray Tracing']
  },
  {
    id: 'gpu-5',
    name: 'AMD Radeon RX 7800 XT',
    category: 'Tarjetas Gráficas',
    price: 1999.99,
    image: findImage('gpu-5'),
    gallery: [findImage('gpu-5'), findImage('gpu-2'), findImage('gpu-1'), findImage('gpu-3')],
    rating: 4,
    reviewCount: 150,
    sku: 'GPU-AMD-7800-XT',
    stock: 45,
    specs: ['16GB GDDR6', 'PCIe 4.0', 'RDNA 3', 'FSR 3']
  },
  {
    id: 'cpu-1',
    name: 'Intel Core i9-13900K',
    category: 'Procesadores',
    price: 2359.99,
    image: findImage('cpu-1'),
    gallery: [findImage('cpu-1'), findImage('cpu-2'), findImage('cpu-3'), findImage('cpu-4')],
    rating: 5,
    reviewCount: 150,
    sku: 'CPU-INT-13900K',
    stock: 35,
    specs: ['24 Cores', '32 Threads', '5.8 GHz Boost', 'LGA1700']
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 9 7950X3D',
    category: 'Procesadores',
    price: 2799.99,
    image: findImage('cpu-2'),
    gallery: [findImage('cpu-2'), findImage('cpu-1'), findImage('cpu-3'), findImage('cpu-4')],
    rating: 5,
    reviewCount: 130,
    sku: 'CPU-AMD-7950X3D',
    stock: 25,
    specs: ['16 Cores', '32 Threads', '128MB L3 Cache', 'AM5']
  },
   {
    id: 'cpu-3',
    name: 'Intel Core i7-14700K',
    category: 'Procesadores',
    price: 1639.99,
    image: findImage('cpu-3'),
    gallery: [findImage('cpu-3'), findImage('cpu-1'), findImage('cpu-2'), findImage('cpu-4')],
    rating: 5,
    reviewCount: 180,
    sku: 'CPU-INT-14700K',
    stock: 50,
    specs: ['20 Cores', '28 Threads', '5.6 GHz Boost', 'LGA1700']
  },
  {
    id: 'cpu-4',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'Procesadores',
    price: 1599.99,
    originalPrice: 1799.99,
    image: findImage('cpu-4'),
    gallery: [findImage('cpu-4'), findImage('cpu-2'), findImage('cpu-1'), findImage('cpu-3')],
    rating: 5,
    reviewCount: 250,
    sku: 'CPU-AMD-7800X3D',
    stock: 80,
    specs: ['8 Cores', '16 Threads', '96MB L3 Cache', 'AM5']
  },
  {
    id: 'monitor-1',
    name: 'Monitor UltraGear 27" 144Hz G-Sync',
    category: 'Monitor',
    price: 1399.99,
    image: findImage('monitor-1'),
    gallery: [findImage('monitor-1'), findImage('monitor-2'), findImage('monitor-3'), findImage('monitor-4')],
    rating: 4,
    reviewCount: 213,
    sku: 'MON-LG-UG27-144',
    stock: 40,
    specs: ['27-inch', '1440p', '144Hz', 'G-Sync']
  },
  {
    id: 'monitor-2',
    name: 'Alienware 34" QD-OLED Curvo',
    category: 'Monitor',
    price: 5199.99,
    originalPrice: 5999.99,
    image: findImage('monitor-2'),
    gallery: [findImage('monitor-2'), findImage('monitor-1'), findImage('monitor-3'), findImage('monitor-4')],
    rating: 5,
    reviewCount: 99,
    sku: 'MON-AW-34QD',
    stock: 15,
    specs: ['34-inch', 'OLED', '175Hz', 'Curvo']
  },
  {
    id: 'monitor-3',
    name: 'Samsung Odyssey G9 49" Curvo',
    category: 'Monitor',
    price: 5599.99,
    image: findImage('monitor-3'),
    gallery: [findImage('monitor-3'), findImage('monitor-1'), findImage('monitor-2'), findImage('monitor-4')],
    rating: 5,
    reviewCount: 120,
    sku: 'MON-SAM-G9',
    stock: 10,
    specs: ['49-inch', 'Dual QHD', '240Hz', 'Curvo']
  },
  {
    id: 'monitor-4',
    name: 'ASUS ROG Swift PG279QM 27"',
    category: 'Monitor',
    price: 2999.99,
    image: findImage('monitor-4'),
    gallery: [findImage('monitor-4'), findImage('monitor-1'), findImage('monitor-2'), findImage('monitor-3')],
    rating: 4,
    reviewCount: 88,
    sku: 'MON-ASUS-PG279QM',
    stock: 25,
    specs: ['27-inch', '1440p', '240Hz', 'IPS']
  },
  {
    id: 'keyboard-1',
    name: 'Teclado Mecánico RGB HyperStrike X',
    category: 'Teclados y Ratones',
    price: 359.99,
    originalPrice: 519.99,
    image: findImage('keyboard-1'),
    rating: 5,
    reviewCount: 128,
    sku: 'KEY-HS-X',
    stock: 60,
    specs: ['Switches Red', 'RGB', 'Full-size', 'Aluminio']
  },
  {
    id: 'mouse-1',
    name: 'Mouse Inalámbrico QuantumWave',
    category: 'Teclados y Ratones',
    price: 199.99,
    originalPrice: 319.99,
    image: findImage('mouse-1'),
    rating: 4,
    reviewCount: 154,
    sku: 'MOU-QW-W',
    stock: 75,
    specs: ['26000 DPI', 'Inalámbrico', 'Ultraligero', 'RGB']
  },
    {
    id: 'keyboard-2',
    name: 'Razer Huntsman V2 Analog',
    category: 'Teclados y Ratones',
    price: 999.99,
    image: findImage('keyboard-2'),
    rating: 5,
    reviewCount: 190,
    sku: 'KEY-RAZER-HV2A',
    stock: 40,
    specs: ['Switches Opticos', 'Analógico', 'RGB Chroma', 'Reposamuñecas']
  },
  {
    id: 'mouse-2',
    name: 'Logitech G Pro X Superlight',
    category: 'Teclados y Ratones',
    price: 639.99,
    image: findImage('mouse-2'),
    rating: 5,
    reviewCount: 400,
    sku: 'MOU-LOGI-PROX',
    stock: 120,
    specs: ['<63g', 'Sensor HERO', 'Inalámbrico', 'PowerPlay']
  },
  {
    id: 'audio-1',
    name: 'Auriculares Astro A50 Wireless',
    category: 'Audio',
    price: 999.99,
    image: findImage('headphones-1'),
    rating: 5,
    reviewCount: 450,
    sku: 'AUD-ASTRO-A50',
    stock: 35,
    specs: ['Inalámbrico', 'Base Station', 'Dolby Audio', 'PS & PC']
  },
  {
    id: 'mic-3',
    name: 'HyperX QuadCast S',
    category: 'Micrófonos',
    price: 679.99,
    image: findImage('mic-3'),
    rating: 5,
    reviewCount: 520,
    sku: 'MIC-HX-QCS',
    stock: 70,
    specs: ['4 Patrones Polares', 'RGB Dinámico', 'Sensor Tap-to-Mute', 'USB']
  },
  {
    id: 'audio-3',
    name: 'SteelSeries Arctis Nova Pro Wireless',
    category: 'Audio',
    price: 1399.99,
    image: findImage('headphones-2'),
    rating: 5,
    reviewCount: 320,
    sku: 'AUD-SS-NOVAPW',
    stock: 28,
    specs: ['ANC', 'Doble Batería', 'Hi-Fi Audio', 'Multi-System']
  },
  {
    id: 'mic-4',
    name: 'Shure MV7 USB/XLR Micrófono',
    category: 'Micrófonos',
    price: 996.00,
    image: findImage('mic-4'),
    rating: 5,
    reviewCount: 280,
    sku: 'AUD-SHURE-MV7',
    stock: 45,
    specs: ['Dinámico', 'USB & XLR', 'Control Táctil', 'App Motiv']
  },
  {
    id: 'mic-5',
    name: 'Razer Seiren V2 Pro',
    category: 'Micrófonos',
    price: 599.99,
    image: findImage('mic-5'),
    rating: 4,
    reviewCount: 150,
    sku: 'MIC-RAZER-SV2P',
    stock: 65,
    specs: ['Dinámico', 'Filtro paso alto', 'Limitador ganancia', 'USB']
  },
  {
    id: 'mic-6',
    name: 'Blue Yeti USB Microphone',
    category: 'Micrófonos',
    price: 519.99,
    image: findImage('mic-6'),
    rating: 4,
    reviewCount: 1800,
    sku: 'MIC-BLUE-YETI',
    stock: 150,
    specs: ['Tri-cápsula', 'Múltiples patrones', 'Control de ganancia', 'Plug & Play']
  },
  {
    id: 'storage-1',
    name: 'SSD NVMe Gen4 2TB FireCuda',
    category: 'Almacenamiento',
    price: 599.99,
    originalPrice: 879.99,
    image: findImage('ssd-1'),
    rating: 5,
    reviewCount: 301,
    sku: 'STO-SEA-FC2T',
    stock: 60,
    specs: ['2TB', 'NVMe PCIe 4.0', '7300 MB/s', 'Heatsink']
  },
  {
    id: 'storage-2',
    name: 'Samsung 980 Pro 1TB',
    category: 'Almacenamiento',
    price: 399.99,
    image: findImage('ssd-2'),
    rating: 5,
    reviewCount: 500,
    sku: 'STO-SAM-980P1T',
    stock: 90,
    specs: ['1TB', 'NVMe PCIe 4.0', '7000 MB/s', 'V-NAND']
  },
  {
    id: 'storage-3',
    name: 'Western Digital Black SN850X 4TB',
    category: 'Almacenamiento',
    price: 1159.99,
    image: findImage('ssd-3'),
    rating: 5,
    reviewCount: 150,
    sku: 'STO-WD-SN850X4T',
    stock: 30,
    specs: ['4TB', 'NVMe PCIe 4.0', '7300 MB/s', 'Game Mode 2.0']
  },
  {
    id: 'memory-1',
    name: 'Corsair Vengeance RGB Pro 32GB DDR5',
    category: 'Memoria',
    price: 519.99,
    image: findImage('ram-1'),
    rating: 5,
    reviewCount: 180,
    sku: 'MEM-COR-VGR532',
    stock: 55,
    specs: ['32GB (2x16GB)', 'DDR5', '6000MHz', 'RGB']
  },
   {
    id: 'memory-2',
    name: 'G.Skill Trident Z5 RGB 64GB DDR5',
    category: 'Memoria',
    price: 879.99,
    image: findImage('ram-2'),
    rating: 5,
    reviewCount: 95,
    sku: 'MEM-GSK-TZ5R64',
    stock: 25,
    specs: ['64GB (2x32GB)', 'DDR5', '6400MHz', 'RGB']
  },
  {
    id: 'power-1',
    name: 'EVGA SuperNOVA 850 G6',
    category: 'Fuente de Poder',
    price: 639.99,
    image: findImage('psu-1'),
    rating: 5,
    reviewCount: 95,
    sku: 'PSU-EVGA-850G6',
    stock: 40,
    specs: ['850 Watts', '80+ Gold', 'Modular', '10 Años Garantía']
  },
  {
    id: 'power-2',
    name: 'Corsair RM1000x SHIFT 1000W',
    category: 'Fuente de Poder',
    price: 839.99,
    originalPrice: 1039.99,
    image: findImage('psu-2'),
    rating: 5,
    reviewCount: 110,
    sku: 'PSU-COR-RM1000XS',
    stock: 30,
    specs: ['1000 Watts', '80+ Gold', 'Modular', 'Conectores Laterales']
  },
  {
    id: 'mousepad-1',
    name: 'SteelSeries QcK Heavy',
    category: 'Mousepad',
    price: 119.99,
    image: findImage('mousepad-1'),
    rating: 5,
    reviewCount: 1500,
    sku: 'PAD-SS-QCKH',
    stock: 200,
    specs: ['Tela micro-tejida', 'Base de goma gruesa', '450x400mm', 'Control']
  },
  {
    id: 'mousepad-2',
    name: 'Logitech G840 XL',
    category: 'Mousepad',
    price: 199.99,
    image: findImage('mousepad-2'),
    rating: 4,
    reviewCount: 800,
    sku: 'PAD-LOGI-G840',
    stock: 150,
    specs: ['Superficie extra grande', '900x400mm', 'Fricción moderada', 'Enrollable']
  },
  {
    id: 'mousepad-3',
    name: 'Razer Gigantus V2',
    category: 'Mousepad',
    price: 139.99,
    image: findImage('mousepad-3'),
    rating: 4,
    reviewCount: 950,
    sku: 'PAD-RAZER-GIGV2',
    stock: 180,
    specs: ['Tejido texturizado', 'Espuma de alta densidad', 'Base antideslizante', 'Varios tamaños']
  },
  {
    id: 'mousepad-4',
    name: 'Corsair MM300 Pro',
    category: 'Mousepad',
    price: 119.99,
    image: findImage('mousepad-4'),
    rating: 4,
    reviewCount: 600,
    sku: 'PAD-COR-MM300P',
    stock: 130,
    specs: ['Resistente a derrames', '930x300mm', 'Bordes cosidos', 'Uso rudo']
  },
  {
    id: 'webcam-1',
    name: 'Logitech C920 HD Pro',
    category: 'Webcams',
    price: 279.99,
    image: findImage('webcam-1'),
    rating: 5,
    reviewCount: 10000,
    sku: 'CAM-LOGI-C920',
    stock: 300,
    specs: ['1080p/30fps', 'Lente de cristal', 'Corrección de luz', 'Micrófonos estéreo']
  },
  {
    id: 'webcam-2',
    name: 'Razer Kiyo Pro',
    category: 'Webcams',
    price: 799.99,
    image: findImage('webcam-2'),
    rating: 5,
    reviewCount: 1200,
    sku: 'CAM-RAZER-KIYOP',
    stock: 80,
    specs: ['1080p/60fps sin comp.', 'Sensor de luz adaptable', 'HDR', 'Lente gran angular']
  },
  {
    id: 'webcam-3',
    name: 'Elgato Facecam',
    category: 'Webcams',
    price: 679.99,
    image: findImage('webcam-3'),
    rating: 4,
    reviewCount: 900,
    sku: 'CAM-ELG-FACECAM',
    stock: 100,
    specs: ['1080p/60fps reales', 'Sensor Sony STARVIS', 'Control avanzado', 'Lente Elgato Prime']
  },
  {
    id: 'webcam-4',
    name: 'Logitech Brio 4K',
    category: 'Webcams',
    price: 719.99,
    image: findImage('webcam-4'),
    rating: 5,
    reviewCount: 2500,
    sku: 'CAM-LOGI-BRIO',
    stock: 90,
    specs: ['Resolución 4K UHD', 'HDR', 'RightLight 3', 'Campo visual ajustable']
  },
  {
    id: 'case-1',
    name: 'NZXT H5 Flow',
    category: 'Case',
    price: 359.99,
    image: findImage('case-1'),
    rating: 5,
    reviewCount: 700,
    sku: 'CASE-NZXT-H5F',
    stock: 50,
    specs: ['Panel frontal perforado', 'Mid-Tower', 'Excelente flujo de aire', 'Gestión de cables']
  },
  {
    id: 'case-2',
    name: 'Lian Li PC-O11 Dynamic',
    category: 'Case',
    price: 639.99,
    image: findImage('case-2'),
    rating: 5,
    reviewCount: 1500,
    sku: 'CASE-LIANLI-O11D',
    stock: 40,
    specs: ['Diseño de doble cámara', 'Vidrio templado', 'Refrigeración líquida', 'USB-C']
  },
  {
    id: 'case-3',
    name: 'Corsair 4000D Airflow',
    category: 'Case',
    price: 399.99,
    image: findImage('case-3'),
    rating: 5,
    reviewCount: 2000,
    sku: 'CASE-COR-4000DA',
    stock: 80,
    specs: ['Alto flujo de aire', 'Panel frontal optimizado', 'Sistema RapidRoute', '2x ventiladores AirGuide']
  },
  {
    id: 'case-4',
    name: 'Fractal Design Meshify 2',
    category: 'Case',
    price: 679.99,
    image: findImage('case-4'),
    rating: 5,
    reviewCount: 800,
    sku: 'CASE-FRACTAL-M2',
    stock: 30,
    specs: ['Diseño icónico', 'Panel frontal de malla', 'Interior modular', 'Filtros de fácil limpieza']
  }
];

export const flashSaleProducts: Product[] = allProducts.filter(p => p.originalPrice).slice(0, 6);


export const kawaiiProducts: Product[] = [
  {
    id: 'kawaii-headset-1',
    name: 'Audífonos Gatito-Chan Rosados',
    category: 'Audifonos',
    price: 319.99,
    originalPrice: 399.99,
    image: findImage('kawaii-headset-1'),
    gallery: [findImage('kawaii-headset-1'), findImage('kawaii-headset-2'), findImage('kawaii-mic-1'), findImage('kawaii-keyboard-1')],
    rating: 5,
    reviewCount: 210,
    tags: ['kawaii'],
    sku: 'KAWA-HSET-CAT1',
    stock: 30,
    specs: ['Orejas RGB', 'Micrófono Desmontable', 'Sonido 7.1', 'Almohadillas Suaves']
  },
    {
    id: 'kawaii-headset-2',
    name: 'Audífonos Orejas de Conejo Blancas',
    category: 'Audifonos',
    price: 339.99,
    image: findImage('kawaii-headset-2'),
    gallery: [findImage('kawaii-headset-2'), findImage('kawaii-headset-1'), findImage('kawaii-mic-1'), findImage('kawaii-keyboard-1')],
    rating: 4,
    reviewCount: 180,
    tags: ['kawaii'],
    sku: 'KAWA-HSET-BUN1',
    stock: 25,
    specs: ['Orejas Iluminadas', 'Bluetooth 5.2', 'Batería 20h', 'Color Blanco Nieve']
  },
  {
    id: 'kawaii-keyboard-1',
    name: 'Teclado 60% Switches Rosados',
    category: 'Teclados',
    price: 479.99,
    image: findImage('kawaii-keyboard-1'),
    gallery: [findImage('kawaii-keyboard-1'), findImage('kawaii-keyboard-2'), findImage('kawaii-keycaps-1'), findImage('kawaii-headset-1')],
    rating: 5,
    reviewCount: 150,
    tags: ['kawaii'],
    sku: 'KAWA-KEYB-60P',
    stock: 40,
    specs: ['60% Layout', 'Switches Lineales', 'PBT Keycaps', 'RGB Pastel']
  },
    {
    id: 'kawaii-keyboard-2',
    name: 'Teclado My Melody Edición Limitada',
    category: 'Teclados',
    price: 559.99,
    originalPrice: 639.99,
    image: findImage('kawaii-keyboard-2'),
    gallery: [findImage('kawaii-keyboard-2'), findImage('kawaii-keyboard-1'), findImage('kawaii-keycaps-1'), findImage('kawaii-headset-1')],
    rating: 5,
    reviewCount: 90,
    tags: ['kawaii'],
    sku: 'KAWA-KEYB-MELODY',
    stock: 15,
    specs: ['TKL Layout', 'Licencia Sanrio', 'Keycaps Temáticas', 'Switches Táctiles']
  },
  {
    id: 'kawaii-mousepad-1',
    name: 'Mousepad Kuromi Edición Especial',
    category: 'Mousepad',
    price: 159.99,
    image: findImage('kawaii-mousepad-1'),
    rating: 5,
    reviewCount: 320,
    tags: ['kawaii'],
    sku: 'KAWA-PAD-KUROMI',
    stock: 50,
    specs: ['900x400mm', 'Bordes Cosidos', 'Superficie Control', 'Licencia Sanrio']
  },
    {
    id: 'kawaii-mousepad-2',
    name: 'Deskmat Cinnamoroll Sky',
    category: 'Mousepad',
    price: 179.99,
    image: findImage('kawaii-mousepad-2'),
    rating: 5,
    reviewCount: 250,
    tags: ['kawaii'],
    sku: 'KAWA-PAD-CINNA',
    stock: 45,
    specs: ['900x400mm', 'Bordes Cosidos', 'Superficie Speed', 'Licencia Sanrio']
  },
  {
    id: 'kawaii-chair-1',
    name: 'Silla Gamer Pastel Dreams',
    category: 'Sillas Gamer Pastel',
    price: 1399.99,
    originalPrice: 1679.99,
    image: findImage('kawaii-chair-1'),
    gallery: [findImage('kawaii-chair-1'), findImage('kawaii-chair-2'), findImage('kawaii-headset-1'), findImage('kawaii-case-2')],
    rating: 4,
    reviewCount: 95,
    tags: ['kawaii'],
    sku: 'KAWA-CHR-PASTEL',
    stock: 20,
    specs: ['Cuero PU Rosa/Blanco', 'Cojines Lumba/Cervical', 'Reclinable 180°', 'Pistón Clase 4']
  },
    {
    id: 'kawaii-chair-2',
    name: 'Silla Gamer Sakura Spirit',
    category: 'Sillas Gamer Pastel',
    price: 1519.99,
    image: findImage('kawaii-chair-2'),
    gallery: [findImage('kawaii-chair-2'), findImage('kawaii-chair-1'), findImage('kawaii-headset-1'), findImage('kawaii-case-2')],
    rating: 5,
    reviewCount: 80,
    tags: ['kawaii'],
    sku: 'KAWA-CHR-SAKURA',
    stock: 18,
    specs: ['Tela Transpirable', 'Bordado de Sakura', 'Cojines de Felpa', 'Reclinable 160°']
  },
  {
    id: 'kawaii-case-1',
    name: 'Funda de Nintendo Switch Cinnamoroll',
    category: 'Case',
    price: 99.99,
    image: findImage('kawaii-case-1'),
    rating: 5,
    reviewCount: 180,
    tags: ['kawaii'],
    sku: 'KAWA-CASE-CINNA-SW',
    stock: 60,
    specs: ['Para Switch/OLED', 'Material TPU Suave', 'Diseño 3D', 'Licencia Sanrio']
  },
  {
    id: 'kawaii-case-2',
    name: 'Carcasa PS5 Hello Kitty & Friends',
    category: 'Case',
    price: 239.99,
    image: findImage('kawaii-case-2'),
    rating: 5,
    reviewCount: 120,
    tags: ['kawaii'],
    sku: 'KAWA-CASE-HK-PS5',
    stock: 30,
    specs: ['Para PS5 Disco', 'Placas Rígidas', 'Fácil Instalación', 'Licencia Sanrio']
  },
   {
    id: 'kawaii-mic-1',
    name: 'Micrófono Corazón Mágico',
    category: 'Microfonos',
    price: 359.99,
    image: findImage('kawaii-mic-1'),
    gallery: [findImage('kawaii-mic-1'), findImage('kawaii-headset-1'), findImage('kawaii-headset-2'), findImage('kawaii-chair-1')],
    rating: 5,
    reviewCount: 110,
    tags: ['kawaii'],
    sku: 'KAWA-MIC-HEART',
    stock: 33,
    specs: ['Condensador USB', 'Iluminación RGB', 'Patrón Cardioide', 'Color Rosa Chicle']
  },
  {
    id: 'kawaii-keycaps-1',
    name: 'Keycaps "Pastel Party"',
    category: 'Teclados',
    price: 239.99,
    image: findImage('kawaii-keycaps-1'),
    rating: 5,
    reviewCount: 190,
    tags: ['kawaii'],
    sku: 'KAWA-CAPS-PASTEL',
    stock: 80,
    specs: ['128 Teclas', 'Material PBT', 'Perfil Cherry', 'Dye-Sub']
  },
];


export function getProductById(id: string): Product | undefined {
  const all = [...allProducts, ...kawaiiProducts];
  return all.find(p => p.id === id);
}

export function getRelatedProducts(currentProduct: Product): Product[] {
  const all = [...allProducts, ...kawaiiProducts];
  return all
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);
}
