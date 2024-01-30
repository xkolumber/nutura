// schema.js

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Názov produktu',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'price',
      title: 'Cena v eurách',
      type: 'string',
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Fotografia produktu',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Kategórie',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          'Antioxidanty',
          'Kĺby a kosti',
          'Fyzická aktivita',
          'Imunitný systém',
          'Zdravie muža',
          'Zdravie ženy',
          'Menštuácia a menopauza',
          'Spánok',
          'Deti',
          'Zrelý vek',
          'Tráviace ťažkosti a pooperačné stavy',
          'Zdravie očí a zrazku',
          'Únava',
          'Srdcovo-cievny systém',
          'Omega 3 mastné kyseliny',
          'Železo',
          'Vitamín B 12',
          'Vitamín D',
          'Minerálne látky',
          'Multivitamíny',
          'Tehotenstvo a dojčenie',
          'Stres a nervozita',
        ],
      },
    },
    {
      name: 'volume',
      title: 'Objem produktu',
      type: 'string',
    },
    {
      name: 'composition',
      title: 'Zloženie',
      type: 'string',
    },
    {
      name: 'storage',
      title: 'Skladovanie',
      type: 'string',
    },
    {
      name: 'recommended',
      title: 'Odporúčané dávkovanie',
      type: 'string',
    },
    {
      name: 'number_of_injections',
      title: 'Počet vstrekov',
      type: 'string',
    },
    {
      name: 'nutrition',
      title: 'Nutričná informácia',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nutrient',
              title: 'Nutrient',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
