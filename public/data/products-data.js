export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) matchingProduct = product;
  });

  return matchingProduct;
}

export const products = [
  // 1 Magnesium Tablets
  {
    id: "c53638ce-6aa0-4b85-b27f-e1d07eb618c3",
    image: "images/product-image (6).png",
    name: "Magnesium Tablets",
    about:
      "Helps strengthen bones and muscles, supporting overall body weight gain. This formula improves muscle function and bone density, crucial for healthy weight gain.",
    tag: "Mineral Supplement",
    rating: {
      stars: 4.5,
      count: 102,
    },
    priceCents: 2600,
    keywords: {
      description:
        "Magnesium is crucial for muscle function, nerve operation, and over 300 biochemical reactions in the body. These capsules provide magnesium in a highly bioavailable form to ensure maximum absorption.",
      benefits:
        "Supports muscle function and relaxation, and help improve appetite and weight gain.",
    },

    ingredients: [
      "Magnesium Oxide",
      "Gelatin (capsule)",
      "Magnesium Stearate",
      "Silica",
      "Calcium Carbonate",
      "Vitamin D3 (Cholecalciferol)",
      "Boron (to enhance calcium absorption)",
    ],
    usage: [
      "Take 1-2 capsules daily.",
      "Take in the evening before bed, as magnesium can promote relaxation and better sleep quality.",
      "Drink with a full glass of water to ensure proper digestion and absorption.",
      "Magnesium is essential for promoting appetite and protein metabolism, which can help in gaining weight.",
    ],
    similarProducts: [
      {
        id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
        image: "images/product-image (5).png",
        name: "Gainers' Multivitamin",
        priceCents: 1988,
      },
      {
        id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
        image: "images/product-image (3).png",
        name: "Ashwagandha Tablets",
        priceCents: 2047,
      },
      {
        id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
        image: "images/product-image (1).png",
        name: " Probiotics Tablets",
        priceCents: 1530,
      },
    ],
  },

  //   2 Papain Capsules

  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/product-image (2).png",
    name: "Papain Capsules",
    about:
      "Papain, derived from papaya, helps break down proteins, ensuring your body efficiently absorbs nutrients for muscle growth and weight gain. Ideal for enhancing digestion after protein-heavy meals.",
    tag: "Digestive Enzyme",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 2179,
    keywords: {
      description:
        "Papain, a proteolytic enzyme from the papaya fruit, assists in breaking down large protein molecules into smaller peptides and amino acids, facilitating easier absorption.",
      benefits:
        "Supports effective digestion and nutrient uptake, aiding in overall weight gain.",
    },

    ingredients: [
      "Fennel Seed Powder",
      "Peppermint Extract",
      "Papaya Fruit Powder",
      "Licorice Root Extract",
    ],

    usage: [
      "Take 1-2 capsules with each meal.",
      "Take before or during meals to improve digestion, especially when consuming high-protein foods.",
      "Drink with a full glass of water to aid in digestion and absorption of the enzyme.",
      " If you consume a high-protein diet, especially from sources like meat, papain can be particularly beneficial. It can also help reduce digestive discomfort after heavy meals.",
    ],
    similarProducts: [
      {
        id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
        image: "images/product-image (4).png",
        name: "Ginger Root Tablets",
        priceCents: 1899,
      },
      {
        id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
        image: "images/product-image (7).png",
        name: "Casein Protein Tablets",
        priceCents: 1489,
      },
      {
        id: "c53638ce-6aa0-4b85-b27f-e1d07eb618c3",
        image: "images/product-image (6).png",
        name: "Magnesium Tablets",
        priceCents: 2600,
      },
    ],
  },

  //   3 Ginger Root Tablets

  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/product-image (4).png",
    name: "Ginger Root Tablets",
    about:
      "Ginger root tablets support digestion while enhancing appetite, helping you eat more regularly and comfortably. This is perfect for those needing an appetite boost to meet their calorie goals for weight gain.",
    tag: "Appetite Stimulant",
    rating: {
      stars: 4.5,
      count: 121,
    },
    priceCents: 1899,
    keywords: {
      description:
        "Ginger root is a well-known digestive aid and appetite stimulant. Its active compounds, including gingerol and shogaol, enhance gastric motility and stimulate appetite, making it easier for individuals to consume larger portions of food necessary for weight gain.",
      benefits:
        "Stimulates appetite and improves digestive health, making it easier to gain weight.",
    },

    ingredients: [
      "Bromelain",
      "Papain",
      "Amylase",
      "Ginger Root Extract",
      "Peppermint Leaf Extract",
      "Ginger Root Powder",
      "Black Pepper Extract (BioPerine)",
      "Digestive Enzyme Blend (Amylase, Lipase)",
    ],

    usage: [
      "Take 1 tablet up to three times daily.",
      "Take 30 minutes before each meal to help stimulate hunger and prepare the digestive system for food intake.",
      "ake with a full glass of water to promote hydration and support the ginger's effectiveness in stimulating appetite and digestion.",
      "f you experience any gastrointestinal discomfort, consider reducing the dosage or taking the tablet with food. Ginger is also known to alleviate nausea, making it ideal for individuals who have difficulty eating due to stomach discomfort.",
    ],
    similarProducts: [
      {
        id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
        image: "images/product-image (7).png",
        name: "Casein Protein Tablets",
        priceCents: 1489,
      },
      {
        id: "c53638ce-6aa0-4b85-b27f-e1d07eb618c3",
        image: "images/product-image (6).png",
        name: "Magnesium Tablets",
        priceCents: 2600,
      },
      {
        id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
        image: "images/product-image (3).png",
        name: "Ashwagandha Tablets",
        rating: {
          stars: 4.5,
          count: 102,
        },
        priceCents: 2047,
      },
    ],
  },

  //   4 Flaxseed Oil Tablets

  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/product-image (8).png",
    name: "Flaxseed Oil Tablets",
    about:
      "A plant-based source of essential fats that promotes healthy weight gain by improving metabolism and increasing calorie intake. Great for those on a vegan or vegetarian diet looking to add healthy body mass.",
    tag: "Essential Fatty Acid Capsules",
    rating: {
      stars: 4.5,
      count: 97,
    },
    priceCents: 1675,
    keywords: {
      description:
        "Rich in Omega-3 fatty acids, Flaxseed Oil Capsules provide essential nutrients that support heart health and reduce inflammation. The high ALA content helps to enhance caloric intake efficiently.",
      benefits:
        "Helps to increase calorie intake and support overall health, making it easier to gain weight.",
    },

    ingredients: [
      "Flaxseed Oil (ALA - Alpha-Linolenic Acid)",
      "Sunflower Lecithin (emulsifier)",
      "Rosemary Extract",
      "Omega-3-6-9 Capsules",
      "Borage Seed Oil (GLA - Gamma-Linolenic Acid)",
      " Fish Oil (EPA, DHA)",
    ],
    usage: [
      "Take 1-2 capsules daily.",
      "Take with meals that contain other fats to improve absorption of ALA",
      " Consume with a meal and a glass of water for optimal digestion.",
      "For vegetarians or vegans, flaxseed oil provides an alternative to fish oil. It can help balance omega-6 fatty acids, which are typically higher in Western diets, contributing to better fat storage and overall weight gain.",
    ],
    similarProducts: [
      {
        id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
        image: "images/product-image (5).png",
        name: "Gainers' Multivitamin",
        priceCents: 1988,
      },
      {
        id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
        image: "images/product-image (3).png",
        name: "Ashwagandha Tablets",
        priceCents: 2047,
      },
      {
        id: "c53638ce-6aa0-4b85-b27f-e1d07eb618c3",
        image: "images/product-image (6).png",
        name: "Magnesium Tablets",
        priceCents: 2600,
      },
    ],
  },

  //   5 Ashwagandha Tablets

  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/product-image (3).png",
    name: "Ashwagandha Tablets",
    about:
      "A stress-reducing adaptogen that promotes healthy weight gain by improving appetite, reducing anxiety-related weight loss, and boosting energy levels. Ashwagandha also supports muscle growth and overall well-being.",
    tag: "Herbal Supplement",
    rating: {
      stars: 4.5,
      count: 109,
    },
    priceCents: 2047,
    keywords: {
      description:
        "Ashwagandha is an adaptogenic herb known for its ability to reduce stress and promote vitality. Its active compounds, like withanolides, help the body adapt to stress, improve energy levels, and stimulate appetite, making it easier for individuals to gain weight, especially under stress-related appetite loss.",
      benefits:
        "Helps reduce stress-related appetite loss and supports healthy weight gain by enhancing overall well-being.",
    },

    ingredients: [
      "Ashwagandha Root Extract (Withania Somnifera)",
      "Black Pepper Extract (BioPerine) (enhances absorption)",
      "Organic Turmeric Extract (anti-inflammatory)",
      "Royal Jelly Powder (supports energy)",
    ],
    usage: [
      "Take 1 capsule twice daily.",
      "Take in the morning and evening to help balance stress levels and promote muscle recovery.",
      "Drink with a full glass of water and consume with meals to reduce potential stomach upset.",
      "Ashwagandha can help with improving appetite and reducing stress, which may prevent weight loss due to stress-related metabolism. Combine with a diet high in calories and protein for best results.",
    ],
    similarProducts: [
      {
        id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
        image: "images/product-image (8).png",
        name: "Flaxseed Oil Tablets",
        priceCents: 1675,
      },
      {
        id: "04701903-bc79-49c6-bc11-1af7e3651358",
        image: "images/product-image (2).png",
        name: "Papain Capsules",
        priceCents: 2179,
      },
      {
        id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
        image: "images/product-image (5).png",
        name: "Gainers' Multivitamin",
        priceCents: 1988,
      },
    ],
  },

  //   6 Gainers' Multivitamin
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/product-image (5).png",
    name: "Gainers' Multivitamin",
    about:
      "Specifically formulated for individuals trying to gain weight, these multivitamins are packed with B vitamins, minerals, and other nutrients that boost metabolism, increase appetite, and support energy production for healthy weight gain.",
    tag: "Multivitamin",
    rating: {
      stars: 4.5,
      count: 113,
    },
    priceCents: 1988,
    keywords: {
      description:
        "Probiotics improve overall digestive health, boost immune function, and help maintain an optimal balance of gut bacteria, leading to improved nutrient absorption and weight gain.",
      benefits:
        "Supports energy production, enhances metabolism, and promotes a healthy appetite.",
    },

    ingredients: [
      "Vitamin A (Retinol)",
      "Vitamin B1 (Thiamine)",
      "Vitamin B2 (Riboflavin)",
      "Vitamin B6 (Pyridoxine)",
      "Vitamin B12 (Cobalamin)",
      "Vitamin D",
      "Vitamin E",
      "Biotin",
      "Iron, Calcium, Zinc, Magnesium",
      "Chromium",
    ],

    usage: [
      "Take 1 capsule daily.",
      "Take in the morning with a meal to ensure optimal nutrient absorption and energy throughout the day.",
      "Drink with a full glass of water to ensure proper digestion and absorption.",
      "Gainers’ Multivitamins are formulated to help fill nutritional gaps and support energy production, muscle growth, and overall weight gain. Pair it with a calorie-dense diet and regular physical activity for best results.",
    ],
    similarProducts: [
      {
        id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
        image: "images/product-image (1).png",
        name: " Probiotics Tablets",
        priceCents: 1530,
      },
      {
        id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
        image: "images/product-image (4).png",
        name: "Ginger Root Tablets",
        priceCents: 1899,
      },
      {
        id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
        image: "images/product-image (8).png",
        name: "Flaxseed Oil Tablets",
        priceCents: 1675,
      },
    ],
  },

  // 7 Digestive Probiotics Tablets

  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/product-image (1).png",
    name: " Probiotics Tablets",
    about:
      "Specifically designed to aid weight gain by enhancing digestive function and nutrient absorption. This probiotic blend helps relieve bloating and improves the body's ability to process high-calorie meals.",
    tag: "Probiotics",
    rating: {
      stars: 4.5,
      count: 125,
    },
    priceCents: 1530,
    keywords: {
      description:
        "These tablets contain a robust blend of probiotics to fortify the digestive tract's health, enhancing the gut microbiome and aiding in the efficient breakdown and absorption of nutrients.",
      benefits:
        "Probiotics improve overall digestive health, boost immune function, and help maintain an optimal balance of gut bacteria, leading to improved nutrient absorption and weight gain.",
    },

    ingredients: [
      "Lactobacillus Casei",
      "Bifidobacterium Breve",
      "Lactobacillus Reuteri",
      "L-Glutamine (for gut health)",
    ],
    usage: [
      "Take 1 capsule daily.",
      "Take in the morning with your first meal for optimal digestion throughout the day.",
      "Drink with a full glass of water and consume with food to support the probiotics’ activity in the digestive system.",
      "Probiotics is particularly useful for those experiencing digestive discomfort or irregularity, helping to maintain a balanced digestive environment conducive to weight gain.",
    ],
    similarProducts: [
      {
        id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
        image: "images/product-image (3).png",
        name: "Ashwagandha Tablets",
        priceCents: 2047,
      },
      {
        id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
        image: "images/product-image (7).png",
        name: "Casein Protein Tablets",
        priceCents: 1489,
      },
      {
        id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
        image: "images/product-image (8).png",
        name: "Flaxseed Oil Tablets",
        priceCents: 1675,
      },
    ],
  },

  //   8 Casein Protein Tablets
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/product-image (7).png",
    name: "Casein Protein Tablets",
    about:
      "Slow-digesting casein protein capsules that provide a concentrated source of protein to help you gain healthy weight and build muscle mass. Ideal for increasing daily protein intake without excess calories.",
    tag: "Protein Tablets",
    rating: {
      stars: 4.5,
      count: 101,
    },
    priceCents: 1489,
    keywords: {
      description:
        "Casein is a slow-digesting protein derived from milk that releases amino acids gradually over time. It's perfect for individuals who need a sustained protein release, especially overnight or between meals. Casein’s slow absorption rate makes it effective in preventing muscle breakdown and promoting steady weight gain.",
      benefits:
        "Helps maintain a steady release of amino acids, supporting weight gain during periods of fasting, such as overnight.",
    },

    ingredients: [
      "Micellar Casein",
      "Calcium Caseinate",
      "L-Glutamine",
      "Magnesium",
      "Vitamin D",
    ],

    usage: [
      " Take 2-3 capsules once daily.",
      "Take before bed to provide a steady supply of amino acids during the night, supporting muscle recovery while you sleep.",
      "Drink with a full glass of water to aid digestion. If taking with a meal, choose one that’s low in fat to avoid slowing the absorption of protein.",
      "Combine with a diet rich in carbohydrates and healthy fats to promote overall weight gain, not just muscle mass.",
    ],
    similarProducts: [
      {
        id: "04701903-bc79-49c6-bc11-1af7e3651358",
        image: "images/product-image (2).png",
        name: "Papain Capsules",
        priceCents: 2179,
      },
      {
        id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
        image: "images/product-image (8).png",
        name: "Flaxseed Oil Tablets",
        priceCents: 1675,
      },
      {
        id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
        image: "images/product-image (4).png",
        name: "Ginger Root Tablets",
        priceCents: 1899,
      },
    ],
  },
];
