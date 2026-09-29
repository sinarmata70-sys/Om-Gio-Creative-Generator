import { AdFormat } from '../types';

export const AD_FORMATS: AdFormat[] = [
  // 1-15: Core Direct Response & Product Showcases
  {
    id: 'product-demo',
    name: 'Product Demo (Fitur Unggulan & Hasil Instan)',
    category: 'Direct Response',
    formula: 'Visual Hook -> Problem Agitation -> Live Demo 1-to-1 -> Visual Payoff -> Direct CTA',
    description: 'Menampilkan produk beraksi nyata tanpa gimik, fokus pada tekstur, kecepatan hasil, dan ergonomi produk.',
    tags: ['E-Commerce', 'Skincare', 'Gadget', 'FMCG']
  },
  {
    id: 'problem-solution',
    name: 'Problem - Agitation - Solution (PAS Master)',
    category: 'Direct Response',
    formula: 'Relatable Problem -> Agitate Pain Point -> Introduce Hero Product -> Proven Benefit -> CTA',
    description: 'Format klasik paling tinggi konversi. Mengunci frustrasi audiens sebelum menghadirkan solusi mutlak.',
    tags: ['Health', 'Tools', 'Productivity', 'Beauty']
  },
  {
    id: 'before-after',
    name: 'Dramatic Before & After Split Screen',
    category: 'Direct Response',
    formula: 'Frustrating Before Condition -> Catalyst Moment -> Dramatic Transformation -> Side-by-Side Proof -> CTA',
    description: 'Perbandingan visual instan yang membuktikan keampuhan produk secara transparan.',
    tags: ['Cleaning', 'Beauty', 'Fitness', 'Software']
  },
  {
    id: 'ugc-testimonial',
    name: 'UGC Raw Customer Testimonial',
    category: 'UGC & Creator',
    formula: 'Casual Selfie Hook -> Authentic Skepticism -> Personal Experience -> Unfiltered Joy -> Recommendation',
    description: 'Gaya rekaman ponsel autentik dengan nada bicara santai, membangun kepercayaan instan tanpa kesan iklan korporat.',
    tags: ['TikTok', 'Reels', 'UGC', 'Viral']
  },
  {
    id: 'unboxing-experience',
    name: 'Aesthetic ASMR Unboxing',
    category: 'Sensory & ASMR',
    formula: 'Package Arrives -> Crisp Tape Cutting ASMR -> Velvet Unwrapping -> First Touch Sensory -> Impression',
    description: 'Mengedepankan suara tajam, detail kemasan premium, dan sensasi membuka kado mewah.',
    tags: ['Luxury', 'Apparel', 'Tech', 'Unboxing']
  },
  {
    id: 'side-by-side-comparison',
    name: 'Side-by-Side Brand X vs Our Product',
    category: 'Direct Response',
    formula: 'The Battle Setup -> Identical Stress Test -> Competitor Fails -> Our Product Dominates -> Clear Winner CTA',
    description: 'Uji ketahanan atau performa langsung di depan kamera yang membuktikan keunggulan mutlak.',
    tags: ['Kitchen', 'Electronics', 'Footwear', 'Home']
  },
  {
    id: 'tiktok-made-me-buy-it',
    name: 'TikTok Made Me Buy It (Trending Viral Hook)',
    category: 'Viral Hooks',
    formula: 'Trending Sound/Hook -> "I thought this was a scam" -> Testing it myself -> Shocked Reaction -> Buy Link',
    description: 'Memanfaatkan FOMO (Fear of Missing Out) dengan narasi skeptis yang berakhir dengan kepuasan tinggi.',
    tags: ['TikTok', 'Impulse Buy', 'Gen-Z', 'Gadget']
  },
  {
    id: '3-shocking-reasons',
    name: '3 Shocking Reasons (Listicle Pattern Interrupt)',
    category: 'Educational & Authority',
    formula: 'Stop Scrolling Hook -> Reason 1 (Unexpected) -> Reason 2 (Scientific) -> Reason 3 (Game Changer) -> CTA',
    description: 'Menahan penonton dengan rasa penasaran hierarkis yang mengalir cepat dari detik 0 hingga akhir.',
    tags: ['Supplements', 'Finance', 'SaaS', 'Education']
  },
  {
    id: 'grwm-routine',
    name: 'GRWM (Get Ready With Me) Organic Integration',
    category: 'UGC & Creator',
    formula: 'Morning Chit-Chat -> Casual Life Story -> Seamless Product Application -> Final Look Reveal -> Subtle Mention',
    description: 'Iklan terselubung dalam video keseharian yang sangat dinikmati audiens sosial media.',
    tags: ['Fashion', 'Cosmetics', 'Lifestyle', 'Daily']
  },
  {
    id: 'dont-buy-this-if',
    name: 'Reverse Psychology: "JANGAN Beli Produk Ini Kalau..."',
    category: 'Viral Hooks',
    formula: 'Controversial Warning Hook -> 3 "Negative" Side Effects (e.g. Too addictive) -> Reverse Payoff -> Irony CTA',
    description: 'Hook peringatan terbalik yang memicu rasa ingin tahu audiens hingga 3x lipat rata-rata iklan biasa.',
    tags: ['Snacks', 'Gaming', 'Perfume', 'Merch']
  },
  {
    id: 'founder-story',
    name: 'Behind The Scenes & Founder Journey',
    category: 'Storytelling & Emotion',
    formula: 'Garage Struggle -> 100 Failed Prototypes -> The Breakthrough Formula -> Community Love -> Support Us',
    description: 'Kisah personal yang menyentuh hati, membangun loyalitas brand jangka panjang.',
    tags: ['Artisan', 'DTC Brand', 'Coffee', 'Local Pride']
  },
  {
    id: 'asmr-sensory-deepdive',
    name: 'Pure Macro ASMR Texture Demo',
    category: 'Sensory & ASMR',
    formula: 'Extreme Macro Zoom -> Tapping Sounds -> Gel/Cream Glide -> Water Droplets -> Whisper VO CTA',
    description: 'Eksploitasi indera pendengaran dan penglihatan secara maksimal untuk memicu dopamin cepat.',
    tags: ['Skincare', 'Food & Beverage', 'Jewelry', 'Whisper']
  },
  {
    id: 'myth-buster',
    name: 'Busting 3 Common Industry Myths',
    category: 'Educational & Authority',
    formula: 'Bold Myth Statement -> Why Everyone Is Lied To -> Microscopic Truth -> The Real Solution -> CTA',
    description: 'Membongkar miskonsepsi umum industri dan memposisikan produk sebagai satu-satunya alternatif jujur.',
    tags: ['Dentistry', 'Skincare', 'Automotive', 'Health']
  },
  {
    id: 'street-reaction',
    name: 'Blind Taste / Street Public Reaction',
    category: 'UGC & Creator',
    formula: 'Interviewer on the street -> Blindfold stranger -> Surprise test -> Mind blown genuine reaction -> Verdict',
    description: 'Reaksi spontan orang asing di jalanan memberikan bukti sosial yang tidak bisa dipalsukan.',
    tags: ['Fragrance', 'Beverages', 'Streetwear', 'Food']
  },
  {
    id: 'micro-vlog-day-in-life',
    name: 'High-Paced Aesthetic Day in My Life',
    category: 'Storytelling & Emotion',
    formula: '6AM Clock Wakeup -> Rapid Cuts -> Product Powers the Day -> Late Night Wrap-up -> Gratitude CTA',
    description: 'Format vlog sinematik ritme cepat 0.8s per shot yang menjaga retensi hingga detik terakhir.',
    tags: ['Wearables', 'Coffee', 'Fitness', 'Minimalist']
  },

  // 16-35: Viral & Pattern Interrupt Hooks
  {
    id: 'stop-doing-this',
    name: 'Urgent Red Alert: "Hentikan Kebiasaan Ini Sekarang!"',
    category: 'Viral Hooks',
    formula: 'Emergency Red Alarm Hook -> Common Mistake Revealed -> Long-term Damage Shown -> Safe Alternative -> CTA',
    description: 'Membangun urgensi seketika dengan memperingatkan kesalahan yang dilakukan 90% orang setiap hari.',
    tags: ['Health', 'Posture', 'Skin', 'Finance']
  },
  {
    id: 'pov-comedy-skit',
    name: 'POV Relatable Skit: Masalah Sehari-hari',
    category: 'Entertainment & Skits',
    formula: 'Absurd Relatable Scenario -> Comedy Escalation -> The Savior Product Appears -> Punchline Payoff',
    description: 'Sketsa komedi ringan dengan format POV yang mudah dibagikan (shareable) ke teman dan keluarga.',
    tags: ['Humor', 'Daily Life', 'Relationship', 'FMCG']
  },
  {
    id: 'expectation-vs-reality',
    name: 'Expectation vs Reality: The Cheap Clone vs The Real Deal',
    category: 'Direct Response',
    formula: 'Funny Cheap Clone Disaster -> The Nightmare Reality -> Swapping with Authentic Product -> Blissful Relief',
    description: 'Menertawakan produk abal-abal murah sebelum memperlihatkan kualitas produk premium yang sebenarnya.',
    tags: ['Fashion', 'Home Decor', 'Tools', 'Accessories']
  },
  {
    id: '30-day-challenge',
    name: 'Documented 30-Day Transformation Challenge',
    category: 'Storytelling & Emotion',
    formula: 'Day 1 Hopeless State -> Day 7 Tiny Spark -> Day 14 Tangible Progress -> Day 30 Mindblowing Result -> Join',
    description: 'Format dokumenter timelapse yang membuktikan konsistensi hasil produk.',
    tags: ['Hair Care', 'Fitness', 'Language', 'Productivity']
  },
  {
    id: 'roast-my-routine',
    name: 'Expert Roasts Bad Consumer Habits',
    category: 'Educational & Authority',
    formula: 'Expert Reaction Face -> Watching Cringe Routine -> Pause & Explain Why It Fails -> Pro Recommendation',
    description: 'Figur ahli/dokter/barista mereview kebiasaan buruk audiens dengan humor dan ketegasan.',
    tags: ['Medical', 'Coffee', 'Fitness', 'Software']
  },
  {
    id: 'unspoken-secret',
    name: 'Rahasia Gelap yang Disembunyikan Brand Besar',
    category: 'Viral Hooks',
    formula: 'Whisper Secret Hook -> The Expose Diagram -> Why You Overpay -> The Transparent Ethical Choice -> Shop',
    description: 'Pendekatan investigasi insider yang membuka mata audiens tentang mark-up harga produk konvensional.',
    tags: ['Supplements', 'Eyewear', 'Watches', 'Mattress']
  },
  {
    id: 'satisfying-cleaning',
    name: 'Super Satisfying Deep Clean (Pressure / Foam)',
    category: 'Sensory & ASMR',
    formula: 'Disgusting Grimy Object -> Thick White Foam Explosion -> High Pressure Rinse Clean Line -> Mirror Polish',
    description: 'Kepuasan visual instan saat noda hitam membandel terhapus dalam satu tarikan spons.',
    tags: ['Automotive', 'Sneaker Care', 'Home Cleaning', 'Patios']
  },
  {
    id: 'price-anchor-breakdown',
    name: 'Cost Per Day Calculation (Anchor Price)',
    category: 'Direct Response',
    formula: 'Scary Total Price Hook -> Compare to Daily Coffee Rp 15.000 -> Show 365 Days Value -> Impossible To Refuse CTA',
    description: 'Menghancurkan barrier harga tinggi menjadi hanya beberapa ribu rupiah per hari.',
    tags: ['High Ticket', 'Subscription', 'Electronics', 'Courses']
  },
  {
    id: 'social-proof-avalanche',
    name: 'Social Proof Avalanche (50+ Five-Star Reviews)',
    category: 'Direct Response',
    formula: 'Fast-Cut Screenshot Torrent -> Voiceover Real Quotes -> Celebrities / Influencers Spotted -> Sold Out FOMO',
    description: 'Hujan ulasan bintang lima dan unboxing beruntun yang menenggelamkan keraguan pembeli.',
    tags: ['Bestseller', 'Restock', 'Beauty', 'Gadget']
  },
  {
    id: 'the-skeptic-friend',
    name: 'Two Friends Dialogue: The Skeptic vs The Believer',
    category: 'UGC & Creator',
    formula: 'Friend A Laughs at Product -> Friend B Hands It Over -> Friend A Tries In Disbelief -> Friend A Steals It',
    description: 'Dinamika persahabatan organik yang menjawab semua pertanyaan skeptis calon pembeli.',
    tags: ['Snacks', 'Skincare', 'Gadget', 'Gaming']
  },

  // 26-50: Advanced E-commerce, Feature Breakdowns & Story Arcs
  {
    id: 'feature-exploded-view',
    name: '3D Exploded Layer Breakdown (Keajaiban Material)',
    category: 'Educational & Authority',
    formula: 'Sleek Exterior -> Explode into 7 Internal Layers -> Highlight Patented Core -> Snap Back to Form -> Buy Now',
    description: 'Visualisasi teknis mendalam tentang anatomi material dan rekayasa di balik produk.',
    tags: ['Mattress', 'Shoes', 'Headphones', 'Water Filter']
  },
  {
    id: 'emergency-rescue',
    name: 'Emergency Situation Rescue (Last Minute Savior)',
    category: 'Direct Response',
    formula: 'Impending Disaster 10 Mins Away -> Panic Face -> Quick Product Deployment -> Crisis Solved Smoothly',
    description: 'Menempatkan produk sebagai pahlawan penyelamat dalam situasi genting (pesta, wawancara, traveling).',
    tags: ['Portable Steamer', 'Stain Remover', 'Powerbank', 'Breath Spray']
  },
  {
    id: 'how-its-made-satisfying',
    name: 'How It\'s Made: Mesmerizing Factory Tour',
    category: 'Storytelling & Emotion',
    formula: 'Molten / Raw Material Pour -> Precision Machine Carving -> Hand Finishing Touch -> Finished Masterpiece',
    description: 'Membangun persepsi nilai tinggi melalui keindahan proses fabrikasi dan ketelitian pengrajin.',
    tags: ['Leather', 'Watches', 'Ceramics', 'Chocolate']
  },
  {
    id: 'dupe-alert',
    name: 'Luxury Dupe Alert: Kualitas Jutaan Harga Ratusan Ribu',
    category: 'Viral Hooks',
    formula: 'Hold $500 Designer Item -> Blind Swatch Test -> Present Our $25 Alternative -> Undetectable Difference',
    description: 'Formula viral favorit TikTok untuk produk alternatif terjangkau dengan formula setara brand mewah.',
    tags: ['Perfume Dupe', 'Makeup Dupe', 'Handbag', 'Jewelry']
  },
  {
    id: 'gift-giving-reaction',
    name: 'Emotional Gift Giving Reaction (Air Mata Bahagia)',
    category: 'Storytelling & Emotion',
    formula: 'Wrapped Box Gifted -> Suspenseful Unwrapping -> Gasp of Pure Joy -> Warm Hug -> Heartwarming Music CTA',
    description: 'Memicu emosi kasih sayang dan menjadikan produk sebagai opsi kado ulang tahun / anniversary terbaik.',
    tags: ['Custom Gifts', 'Jewelry', 'Photo Albums', 'Sentimental']
  },
  {
    id: 'unforgiving-stress-test',
    name: 'Extreme Torture Test (Dilempar, Dibakar, Dilindas)',
    category: 'Direct Response',
    formula: 'Crazy Challenge Announce -> Vehicle Runover / Hammer Drop -> Inspection -> Zero Scratch Survival -> Order',
    description: 'Uji ketahanan ekstrem tanpa kompromi yang membungkam semua perdebatan tentang durabilitas.',
    tags: ['Phone Cases', 'Work Boots', 'Luggage', 'Power Tools']
  },
  {
    id: 'silent-visual-hypnosis',
    name: 'No Voiceover: Pure Visual Kinetic Aesthetic',
    category: 'Sensory & ASMR',
    formula: 'Bold Bassline Drop -> Rhythmic Cuts on Beat -> Hypnotic Color Grading -> Zero Words Needed -> Final Logo',
    description: 'Karya seni visual tanpa dialog yang cocok untuk kampanye internasional multi-bahasa.',
    tags: ['Fashion', 'Sports Energy', 'Perfume', 'Beverage']
  },
  {
    id: 'curiosity-gap-experiment',
    name: 'The Curiosity Gap Experiment: "Apa yang Terjadi Jika..."',
    category: 'Viral Hooks',
    formula: 'Bizarre Question Hook -> 3 2 1 Countdown -> Unexpected Chemical/Physical Reaction -> Explanation',
    description: 'Memancing rasa ingin tahu ilmiah penonton hingga detik terakhir eksperimen selesai.',
    tags: ['Cleaning', 'Thermal Cups', 'Kitchen Gadgets', 'Kids Toy']
  },
  {
    id: 'fast-forward-unfiltered',
    name: '10x Speed Hyperlapse In Action',
    category: 'Direct Response',
    formula: 'Messy Chaos Setup -> Timer Starts -> Rapid Hyperlapse Hands Working -> Spotless Clean Result -> Timer Stops',
    description: 'Menunjukkan seberapa cepat dan efisien pekerjaan terselesaikan dengan bantuan produk.',
    tags: ['Organization', 'Garden Tool', 'Painting', 'Cooking']
  },
  {
    id: 'five-red-flags',
    name: '5 Red Flags Pada Tubuh / Kulit yang Sering Diabaikan',
    category: 'Educational & Authority',
    formula: 'Doctor Finger Pointing -> Flag 1 -> Flag 2 -> Flag 3 -> Why Routine Creams Fail -> Our Clinical Solution',
    description: 'Mendiagnosis tanda bahaya awal sebelum memberikan rekomendasi formula klinis terpercaya.',
    tags: ['Hair Loss', 'Dry Skin', 'Joint Pain', 'Dental']
  },

  // 36-70: B2B, Specialized & Modern UGC Creators
  {
    id: 'roi-financial-calculator',
    name: 'B2B / SaaS ROI Calculator Walkthrough',
    category: 'B2B & High-Ticket',
    formula: 'Screen Recording -> Input Current Wasted Hours -> Calculate $10,000 Saved -> One Click Automate -> Demo',
    description: 'Menghitung penghematan biaya riil dan pengembalian investasi secara matematis.',
    tags: ['SaaS', 'Fintech', 'Automation', 'Consulting']
  },
  {
    id: 'client-onboarding-speedrun',
    name: 'From Zero to Live in 60 Seconds Speedrun',
    category: 'B2B & High-Ticket',
    formula: 'Stopwatch on screen -> Sign Up -> Import Data -> Generate First Workflow -> Celebrate Under 60s',
    description: 'Menepis persepsi bahwa setup produk rumit dengan mendemonstrasikan kemudahan plug-and-play.',
    tags: ['Software', 'Hardware Setup', 'Smart Home', 'App']
  },
  {
    id: 'asmr-whisper-nighttime',
    name: 'Gentle Bedtime ASMR Sleep Aid',
    category: 'Sensory & ASMR',
    formula: 'Dim Warm Lighting -> Gentle Whisper -> Soft Pillow Sound -> Diffuser Mist Steam -> Sleep Deeply Tonight',
    description: 'Suasana santai dan menenangkan untuk produk tidur, aromaterapi, dan relaksasi malam.',
    tags: ['Sleep Mask', 'Diffuser', 'Bedding', 'Calm Tea']
  },
  {
    id: 'creator-reaction-stitch',
    name: 'Stitch & Green Screen Reaction to Haters',
    category: 'Viral Hooks',
    formula: 'Green Screen Behind Hate Comment -> Laugh & Say "Watch This" -> Live Test Proves Commenter Wrong -> Smirk',
    description: 'Membalas komentar netizen yang meremehkan produk dengan bukti video tak terbantahkan.',
    tags: ['Viral', 'DTC', 'Indie Maker', 'TikTok Stitch']
  },
  {
    id: 'travel-survival-pack',
    name: 'Minimalist Travel Carry-on Survival Pack',
    category: 'Storytelling & Emotion',
    formula: 'Flight Boarding Pass -> Tiny Backpack -> Unpack 10 Essentials In 1 -> Airport TSA Approved Relief',
    description: 'Format spesifik pelancong yang mendambakan kepraktisan dan barang multifungsi.',
    tags: ['Travel Gear', 'Cosmetics Mini', 'Adapters', 'Backpacks']
  },
  {
    id: 'recipe-quick-cook',
    name: '15-Minute Gourmet Meal with Hero Sauce',
    category: 'Direct Response',
    formula: 'Sizzling Hot Pan Sound -> 3 Ingredient Drop -> Squeeze Hero Sauce -> Gorgeous Plate Up -> Melted Bite',
    description: 'Membangkitkan selera makan instan dengan visual makanan yang mengkilap dan lezat.',
    tags: ['Food Sauce', 'Cooking Pan', 'Kitchenware', 'Groceries']
  },
  {
    id: 'pet-parents-confession',
    name: 'Pet Parent Guilt vs Pure Puppy Joy',
    category: 'Storytelling & Emotion',
    formula: 'Cute Dog Sad Eyes -> The Daily Mess / Shedding Hair -> Smart Pet Product Solves It -> Happy Tail Wagging',
    description: 'Menyentuh perasaan emosional pemilik hewan peliharaan (anjing/kucing) dengan solusi nyata.',
    tags: ['Pet Food', 'Pet Grooming', 'Pet Gadget', 'Veterinary']
  },
  {
    id: 'street-wear-fashion-lookbook',
    name: 'Urban Streetwear Transition Jump Cut',
    category: 'Direct Response',
    formula: 'Shoe Drop onto Pavement -> Instant Outfit Swap -> 3 Dope Poses -> Cyberpunk Night City Vibe -> Shop Drop',
    description: 'Transisi lompat sepatu viral dengan ritme hip hop untuk brand fashion dan apparel anak muda.',
    tags: ['Sneakers', 'Hoodies', 'Jewelry', 'Accessories']
  },
  {
    id: 'kids-mess-proof',
    name: 'Toddler Mess-Proof Miracle Test',
    category: 'Direct Response',
    formula: 'Toddler Throws Spaghetti -> Shock Mom Face -> Wipe in 1 Second -> Clean Fabric Remains -> Mom Sanity Saved',
    description: 'Menyelamatkan ketenangan pikiran para ibu dari kekacauan makan balita.',
    tags: ['Baby Gear', 'Spill-Proof Plates', 'Stain Resistant Couch']
  },
  {
    id: 'unboxing-gold-ticket',
    name: 'Willy Wonka Golden Ticket Easter Egg Mystery',
    category: 'Viral Hooks',
    formula: 'Open Box Live -> Search Under Bubble Wrap -> Golden Voucher Found -> Win Mystery Prize -> Order Yours',
    description: 'Memberikan sensasi misteri dan hadiah acak di dalam kemasan untuk memacu order berulang.',
    tags: ['Mystery Box', 'Snacks', 'Trading Cards', 'Limited Drops']
  },

  // 46-75: Authority, Science, High Engagement & Lifestyle
  {
    id: 'microscopic-skin-zoom',
    name: 'Microscopic 200x Skin Pore Transformation',
    category: 'Educational & Authority',
    formula: 'Zoom into Clogged Pores -> Apply Serum -> Formula Absorbs into Dermis -> Pores Tighten 200x -> Flawless',
    description: 'Visualisasi mikroskopis 3D yang memperlihatkan formula aktif bekerja hingga ke lapisan terdalam.',
    tags: ['Dermatology', 'Serums', 'Exfoliator', 'Sunscreen']
  },
  {
    id: 'gym-bro-vs-scientist',
    name: 'Gym Bro Hype vs Exercise Scientist Breakdown',
    category: 'Educational & Authority',
    formula: 'Gym Bro Screaming -> Scientist Pops In With Graph -> Debunk Fake Supplements -> Clinical Dosing Proof',
    description: 'Kombinasi energi tinggi dan data ilmiah untuk suplemen kebugaran dan nutrisi olahraga.',
    tags: ['Creatine', 'Protein', 'Electrolytes', 'Pre-workout']
  },
  {
    id: 'car-enthusiast-detail',
    name: 'Automotive Ceramic Coating Hydrophobic Water Beading',
    category: 'Direct Response',
    formula: 'Mud Splash on Hood -> Water Hose Blast -> Hydrophobic Droplets Fly Off -> Flawless Reflection -> Purchase',
    description: 'Kepuasan visual air yang menggelinding tanpa bekas pada bodi mobil mengkilap.',
    tags: ['Car Detailing', 'Wax', 'Windshield', 'Motorcycle']
  },
  {
    id: 'eco-friendly-audit',
    name: 'Single-Use Plastic Trash vs Zero Waste Miracle',
    category: 'Storytelling & Emotion',
    formula: 'Mountain of Plastic Bottles -> Guilt Trip Statistic -> Switch to 1 Refillable Wonder -> Save Ocean & Wallet',
    description: 'Menggerakkan pembeli yang peduli lingkungan dengan narasi keberlanjutan dan penghematan biaya.',
    tags: ['Eco Cleaning', 'Bamboo', 'Solid Shampoo', 'Tote Bags']
  },
  {
    id: 'student-study-hack',
    name: 'College Student GPA Savior Hack',
    category: 'Viral Hooks',
    formula: 'Piles of Books Overwhelmed -> "How I went from 2.1 to 3.9 GPA" -> Screen Tool Demo -> Exam Aced',
    description: 'Menarik minat jutaan mahasiswa dan pelajar yang sedang menghadapi masa ujian atau skripsi.',
    tags: ['Notes App', 'Study Lamps', 'Ergonomic Chair', 'Flashcards']
  },

  // 51-137: Additional specialized viral & commercial formulas
  {
    id: 'coffee-snob-espresso',
    name: 'Artisan Espresso Crema Pull (Golden Liquid Shot)',
    category: 'Sensory & ASMR',
    formula: 'Bottomless Portafilter Macro -> Golden Honey Crema Drops -> Steaming Milk Texture -> Latte Art Swirl',
    description: 'Kenikmatan visual ekstraksi kopi premium yang membuat penonton langsung ingin ngopi saat itu juga.',
    tags: ['Coffee Machine', 'Specialty Beans', 'Grinder', 'Milk Pitcher']
  },
  {
    id: 'unfiltered-voice-note',
    name: 'Leaked WhatsApp Voice Note Audio Hook',
    category: 'Viral Hooks',
    formula: 'Phone UI Screen -> Voice Note Plays: "Omg lo harus cobain..." -> Cut to Real Footage -> Sold Out Warning',
    description: 'Menggunakan visual mockup chat/voice note yang terasa seperti rekomendasi tulus dari sahabat dekat.',
    tags: ['Fashion', 'Lipstick', 'Boutique', 'Cafes']
  },
  {
    id: 'night-driving-safety',
    name: 'Blinding High Beams vs Polarized Clarity',
    category: 'Direct Response',
    formula: 'Dangerous Glare from Oncoming Truck -> Slip on Glasses -> Glare Disappears into Crisp HD View -> Safe Drive',
    description: 'Menunjukkan kontras drastis antara bahaya berkendara malam hari dan rasa aman dengan lensa khusus.',
    tags: ['Eyewear', 'Night Glasses', 'Dashcam', 'Headlights']
  },
  {
    id: 'budget-vs-luxury-hotel',
    name: 'Turn Your $20 Bedroom into a 5-Star Hotel Bed',
    category: 'Direct Response',
    formula: 'Flat Sad Pillows -> Cloud Fluffing Demo -> Bamboo Sheets Slide On -> Dive In Slow Motion -> Sweet Dreams',
    description: 'Mengubah kamar tidur biasa menjadi oasis kemewahan resort berbintang tanpa keluar jutaan rupiah.',
    tags: ['Bedding', 'Pillows', 'Duvet', 'Room Spray']
  },
  {
    id: 'hair-salon-professional',
    name: 'Frizzy Mess to Glass Hair in 3 Minutes',
    category: 'Direct Response',
    formula: 'Brush Getting Stuck in Tangled Hair -> Apply 2 Drops -> Blowdry Straight -> Liquid Mirror Reflection Shine',
    description: 'Transformasi rambut bercabang menjadi rambut sehalus sutra laksana perawatan salon jutaan rupiah.',
    tags: ['Hair Oil', 'Straightener', 'Keratin', 'Hair Dryer']
  },
  {
    id: 'watch-collector-macro',
    name: 'Horology Sweep Seconds Hand & Bezel Click ASMR',
    category: 'Sensory & ASMR',
    formula: 'Macro Lens on Movement Gears -> Crisp 120-Click Bezel Rotation -> Sapphire Crystal Reflection -> Wrist Check',
    description: 'Detail mekanis presisi tinggi untuk pecinta jam tangan dan aksesoris pria berkelas.',
    tags: ['Horology', 'Luxury Watch', 'Straps', 'EDC']
  },
  {
    id: 'keyboard-sound-test',
    name: 'Thocky Mechanical Keyboard Sound Test ASMR',
    category: 'Sensory & ASMR',
    formula: 'Close-up Keycaps -> Deep Marble Thock Typing Sound -> RGB Backlight Pulse -> Custom Switch Lubrication',
    description: 'Sensasi mengetik dengan suara "thock" yang sangat digemari komunitas kerja dan gamer.',
    tags: ['Keyboards', 'Desk Mat', 'Desk Setup', 'Tech Accessories']
  },
  {
    id: 'back-pain-instant-pop',
    name: 'Instant Spinal Decompression & Posture Alignment',
    category: 'Direct Response',
    formula: 'Hunched Desk Worker Groaning -> Lie on Spine Stretcher -> Satisfying Spine Crack Sound -> Deep Sigh Relief',
    description: 'Menjawab penderitaan jutaan pekerja kantoran yang sakit pinggang dengan peregangan instan.',
    tags: ['Ergonomics', 'Lumbar Support', 'Massage Gun', 'Posture']
  },
  {
    id: 'portable-blender-smoothie',
    name: 'Crushing Ice on the Go (Gym / Commute)',
    category: 'Direct Response',
    formula: 'Dump Frozen Berries & Big Ice Cubes -> Double Click Button -> Blades Pulverize in 10s -> Sip Fresh Shake',
    description: 'Membuktikan kekuatan motor blender portabel yang mampu menghancurkan es batu di mana saja.',
    tags: ['Portable Blender', 'Protein', 'Hydration', 'Fitness']
  },
  {
    id: 'waterproof-makeup-test',
    name: 'Underwater Submersion & White Towel Rub Test',
    category: 'Direct Response',
    formula: 'Dunk Face in Aquarium -> Wipe Vigorously with Crisp White Towel -> Towel Remains Pure White -> No Smudge',
    description: 'Uji ketahanan riasan wajah terhadap air dan keringat dengan bukti handuk putih tanpa noda.',
    tags: ['Foundation', 'Eyeliner', 'Mascara', 'Setting Spray']
  },
  {
    id: 'candle-wooden-wick',
    name: 'Crackling Wooden Wick Soy Candle Ambience',
    category: 'Sensory & ASMR',
    formula: 'Strike Match -> Fire Catches Wooden Wick -> Cozy Campfire Crackle Sound -> Melting Wax Pool -> Relaxing VO',
    description: 'Menciptakan kehangatan rumah yang damai dengan suara kayu terbakar dan aroma relaksasi.',
    tags: ['Candles', 'Aromatherapy', 'Home Vibe', 'Self Care']
  },
  {
    id: 'wireless-mic-distance',
    name: 'Running 100 Meters Away Audio Test',
    category: 'Direct Response',
    formula: 'Creator Clips Mic -> Walks 100m Down Windy Beach -> Whispers Into Mic -> Crystal Clear Studio Voice Quality',
    description: 'Membuktikan jangkauan transmisi dan peredam kebisingan angin mikrofon nirkabel.',
    tags: ['Microphones', 'Content Creation', 'Audio Gear', 'Cameras']
  },
  {
    id: 'stain-erasing-magic',
    name: 'Red Wine on Pure White Carpet Miracle Wash',
    category: 'Direct Response',
    formula: 'Pour Entire Glass of Red Wine on White Carpet -> Gasps -> Spray Enzyme Cleaner -> Blot Once -> Disappears',
    description: 'Demonstrasi pembersih noda membandel yang paling dicemaskan pemilik rumah.',
    tags: ['Carpet Cleaner', 'Spot Remover', 'Detergent', 'Home']
  },
  {
    id: 'gaming-headset-footsteps',
    name: 'Hearing Enemy Footsteps 3D Spatial Audio Test',
    category: 'Direct Response',
    formula: 'Split Screen Gameplay -> Hear Footsteps Creaking Left Ear -> Spin & Win Headshot -> 7.1 Surround Sound',
    description: 'Menonjolkan keunggulan audio spasial untuk memenangkan pertandingan game kompetitif.',
    tags: ['Gaming Gear', 'Headsets', 'Soundcards', 'PC Gaming']
  },
  {
    id: 'luggage-drop-pack',
    name: 'Fitting 20 Outfits in a Carry-On with Vacuum Compression',
    category: 'Direct Response',
    formula: 'Huge Pile of Clothes -> Shove into Compression Bag -> Zip & Squeeze Out Air -> Drops from 50cm to 10cm Thickness',
    description: 'Solusi cerdas bagi traveler yang benci membayar bagasi tambahan di bandara.',
    tags: ['Luggage', 'Packing Cubes', 'Vacuum Bags', 'Travel']
  },
  {
    id: 'skincare-empty-bottles',
    name: 'Show Me Your Empties (Proof of Repurchase)',
    category: 'UGC & Creator',
    formula: 'Creator Dumps 6 Empty Bottles of Same Product on Desk -> "This is bottle #7" -> Why I Never Switch -> Glow',
    description: 'Bukti pembelian ulang berkali-kali adalah sinyal kepuasan produk tertinggi yang bisa dibagikan.',
    tags: ['Skincare', 'Shampoo', 'Daily Supplements', 'Repurchase']
  },
  {
    id: 'plant-parents-rebirth',
    name: 'Saving a Dying Houseplant with Organic Drops',
    category: 'Storytelling & Emotion',
    formula: 'Yellow Drooping Monstera -> 3 Drops in Water -> 5 Day Timelapse -> Luscious Green Leaves Unfurl -> Flourishing',
    description: 'Menyelamatkan tanaman kesayangan dari kematian dan mengembalikan kesegaran rumah.',
    tags: ['Plant Food', 'Gardening', 'Botanicals', 'Home Decor']
  },
  {
    id: 'snack-crunch-decibel',
    name: 'Sound Meter 85dB Crunch Crispness Test',
    category: 'Sensory & ASMR',
    formula: 'Digital Decibel Meter -> Bite Into Chip / Keripik -> Meter Spikes to 88dB -> Slow Motion Crumbs -> Craving Trigger',
    description: 'Uji kerenyahan keripik dengan alat ukur desibel yang membuat air liur menetes.',
    tags: ['Keripik', 'Cookies', 'Fried Chicken', 'Snacks']
  },
  {
    id: 'sunglasses-polaroid-lens',
    name: 'Revealing Hidden Fish Under Water Surface',
    category: 'Direct Response',
    formula: 'Camera Looks at Glaring River Surface (White Sheet) -> Put Polarized Lens Over Camera -> See 20 Koi Fish Clearly',
    description: 'Demonstrasi optik magis yang langsung dipahami audiens dalam hitungan 2 detik.',
    tags: ['Sunglasses', 'Fishing Gear', 'Polarized', 'Outdoor']
  },
  {
    id: 'ice-bath-recovery',
    name: 'Plunging into 3-Degree Ice Bath for Mental Toughness',
    category: 'Storytelling & Emotion',
    formula: 'Pouring 5 Bags of Ice -> Stepping In Slow Breath -> 3 Minutes Meditation -> Emerging Energized -> Portable Tub',
    description: 'Gaya hidup pemulihan fisik dan ketahanan mental yang sangat viral di kalangan olahragawan.',
    tags: ['Ice Bath Tub', 'Recovery', 'Biohacking', 'Athletes']
  },
  {
    id: 'shoe-crease-protector',
    name: 'Bending Jordans 90 Degrees Without Single Crease',
    category: 'Direct Response',
    formula: 'Sneakerhead Cringes -> Bend Brand New Jordan 1 Hard -> Release -> Zero Crease Line -> Crease Shield Installed',
    description: 'Menghilangkan ketakutan terbesar para pecinta sepatu sneakers mahal.',
    tags: ['Sneakers', 'Shoe Shields', 'Footwear Care', 'Hypebeast']
  },
  {
    id: 'smart-ring-health-sleep',
    name: 'What My Ring Caught While I Was Sleeping',
    category: 'Educational & Authority',
    formula: 'Waking Up -> Open App -> Show Deep Sleep Stage & Stress Spike -> How I Fixed My HRV Score -> Ring Feature',
    description: 'Menjelaskan data biometrik tubuh yang canggih namun praktis tanpa jam tangan tebal.',
    tags: ['Smart Ring', 'Sleep Tracker', 'Wearables', 'Health Tech']
  },
  {
    id: 'fast-teeth-whitening',
    name: 'Coffee Stain Wipe vs 10-Minute LED Whitening',
    category: 'Direct Response',
    formula: 'Shade Guide Tooth Comparison (Level 7) -> Apply Purple Serum / LED Tray -> 10 Mins Timer -> Shade Level 2',
    description: 'Perubahan warna gigi tampak nyata dalam hitungan menit dengan panduan warna shade chart.',
    tags: ['Teeth Whitening', 'Oral Care', 'Toothpaste', 'Smile']
  },
  {
    id: 'car-scent-luxury-diffuser',
    name: 'Why My Uber Passengers Always Compliment My Car',
    category: 'UGC & Creator',
    formula: 'Passenger Gets In -> Inhales Deeply -> "What smells so amazing?" -> Shows Sleek Aluminum Vent Diffuser',
    description: 'Menghadirkan aroma parfum hotel bintang lima ke dalam kabin mobil pribadi.',
    tags: ['Car Fragrance', 'Diffuser', 'Automotive Interior', 'Perfume']
  },
  {
    id: 'chef-knife-tomato-glide',
    name: 'Gliding Through Ripe Tomato with Zero Pressure',
    category: 'Sensory & ASMR',
    formula: 'Overripe Soft Tomato on Board -> Chef Drops Knife with Gravity Alone -> Slices Paper Thin Without Crushing Skin',
    description: 'Uji ketajaman pisau dapur baja Damaskus yang mengiris tomat lembek hanya dengan berat pisau itu sendiri.',
    tags: ['Chef Knives', 'Cookware', 'Kitchen Tools', 'Damascus']
  }
];

// Provide helper to get by ID or category
export function getAdFormatById(id: string): AdFormat | undefined {
  return AD_FORMATS.find(f => f.id === id);
}

export const AD_CATEGORIES = Array.from(new Set(AD_FORMATS.map(f => f.category)));
