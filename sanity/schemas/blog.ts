import type {Rule} from '@sanity/types'

export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Názov článku',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Názov článku je povinný!'),
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
      name: 'date_blog',
      title: 'Dátum článku',
      type: 'date',
      validation: (Rule: Rule) => Rule.required().error('Dátum článku je povinný!'),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Popis 1',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().error('Popis 1 je povinný!'),
    },
    {
      name: 'photo1',
      type: 'image',
      title: 'Obrázok',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content2',
      type: 'array',
      title: 'Popis 2',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
    {
      name: 'photo2',
      type: 'image',
      title: 'Obrázok 2',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content3',
      type: 'array',
      title: 'Popis 3',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
    {
      name: 'photo3',
      type: 'image',
      title: 'Obrázok 3',
      options: {
        hotspot: true,
      },
    },
  ],
}
