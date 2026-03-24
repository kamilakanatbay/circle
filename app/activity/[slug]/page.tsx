import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBySlug, activities } from '@/lib/data'
import { ActivityDetail } from '@/components/ActivityDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return activities.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const activity = getBySlug(slug)
  if (!activity) return {}
  return {
    title: activity.title,
    description: activity.tagline,
    openGraph: {
      images: [activity.image],
      type: 'article',
    },
  }
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params
  const activity = getBySlug(slug)
  if (!activity) notFound()

  return (
    <div className="pt-16">
      <ActivityDetail activity={activity} />
    </div>
  )
}
