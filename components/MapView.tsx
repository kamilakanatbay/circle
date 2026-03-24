'use client'

import { useEffect, useRef } from 'react'
import type { MapUser, RadiusKm, MyStatus } from '@/lib/mapTypes'

interface Props {
  users: MapUser[]
  myStatus: MyStatus
  radiusKm: RadiusKm
  onUserClick: (user: MapUser) => void
}

export function MapView({ users, myStatus, onUserClick }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clusterGroupRef = useRef<any>(null)

  // ── Initialise map once on mount ──────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || leafletMapRef.current) return

    let cancelled = false

    async function initMap() {
      // Dynamic imports — Leaflet MUST NOT run on the server
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      await import('leaflet.markercluster')
      await import('leaflet.markercluster/dist/MarkerCluster.css')

      if (cancelled || !mapContainerRef.current) return

      const map = L.map(mapContainerRef.current, {
        center: [30, 10],   // rough world center
        zoom: 3,
        zoomControl: true,
        attributionControl: true,
        preferCanvas: true,
      })

      // CartoDB dark tiles — no token required
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map)

      leafletMapRef.current = map

      // Render initial markers
      renderMarkers(L, map, users, onUserClick, clusterGroupRef)
    }

    initMap()

    return () => {
      cancelled = true
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Re-render markers when users / callback changes ───────
  useEffect(() => {
    if (!leafletMapRef.current) return
    import('leaflet').then(({ default: L }) => {
      renderMarkers(L, leafletMapRef.current, users, onUserClick, clusterGroupRef)
    })
  }, [users, onUserClick])

  // ── Add/remove "my" bubble when myStatus changes ──────────
  useEffect(() => {
    if (!leafletMapRef.current) return
    import('leaflet').then(({ default: L }) => {
      // Remove existing "me" marker if any
      leafletMapRef.current.eachLayer((layer: any) => {
        if (layer._isMyMarker) leafletMapRef.current.removeLayer(layer)
      })

      if (myStatus.isActive && myStatus.lat && myStatus.lng) {
        const html = buildBubbleHTML(
          myStatus.firstName ? myStatus.firstName[0].toUpperCase() : 'Me',
          myStatus.interests[0] ?? '',
          true // isMe
        )
        const icon = L.divIcon({
          html,
          className: 'circle-bubble-marker',
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        })
        const marker = L.marker([myStatus.lat, myStatus.lng], { icon })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(marker as any)._isMyMarker = true
        marker.addTo(leafletMapRef.current)
        leafletMapRef.current.flyTo([myStatus.lat, myStatus.lng], 14, {
          duration: 1.5,
        })
      }
    })
  }, [myStatus])

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ background: '#0a0a0a' }}
    />
  )
}

// ── Helpers ────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderMarkers(L: any, map: any, users: MapUser[], onUserClick: (u: MapUser) => void, clusterGroupRef: React.MutableRefObject<any>) {
  // Remove old cluster group
  if (clusterGroupRef.current) {
    map.removeLayer(clusterGroupRef.current)
    clusterGroupRef.current = null
  }

  // Build new cluster group (leaflet.markercluster adds markerClusterGroup to L at runtime)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cluster = (L as any).markerClusterGroup({
    maxClusterRadius: 70,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: (c: any) => buildClusterIcon(L, c),
    // Animate cluster splitting
    animateAddingMarkers: false,
  })

  users.forEach(user => {
    const html = buildBubbleHTML(user.initial, user.interests[0] ?? '', false)
    const icon = L.divIcon({
      html,
      className: 'circle-bubble-marker',
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    })
    const marker = L.marker([user.lat, user.lng], { icon })
    marker.on('click', () => onUserClick(user))
    cluster.addLayer(marker)
  })

  map.addLayer(cluster)
  clusterGroupRef.current = cluster
}

function buildBubbleHTML(initial: string, topInterest: string, isMe: boolean): string {
  const borderColor = isMe
    ? 'rgba(245,240,232,0.9)'
    : 'rgba(245,240,232,0.35)'
  const bgColor = isMe ? '#2a2a2a' : '#1c1c1c'
  const glowColor = isMe
    ? 'rgba(245,240,232,0.18)'
    : 'rgba(245,240,232,0.08)'

  return `
    <div style="position:relative;cursor:pointer;width:44px;height:44px;">
      <!-- Outer glow pulse ring -->
      <div style="
        position:absolute;
        inset:-8px;
        border-radius:50%;
        background:${glowColor};
        animation:bubblePulse 2.5s ease-in-out infinite;
        pointer-events:none;
      "></div>
      <!-- Inner ring -->
      <div style="
        position:absolute;
        inset:-3px;
        border-radius:50%;
        border:1px solid rgba(245,240,232,0.15);
        pointer-events:none;
      "></div>
      <!-- Bubble -->
      <div style="
        position:relative;
        width:44px;height:44px;
        border-radius:50%;
        background:${bgColor};
        border:1.5px solid ${borderColor};
        display:flex;align-items:center;justify-content:center;
        font-family:Georgia,serif;
        font-size:15px;font-weight:600;
        color:#F5F0E8;
        box-shadow:0 0 18px rgba(245,240,232,0.12),0 2px 8px rgba(0,0,0,0.7);
      ">${isMe ? '✦' : initial}</div>
      <!-- Interest chip below -->
      ${topInterest ? `
      <div style="
        position:absolute;
        bottom:-20px;left:50%;transform:translateX(-50%);
        font-size:8.5px;
        color:rgba(245,240,232,0.5);
        white-space:nowrap;
        font-family:system-ui,sans-serif;
        letter-spacing:0.04em;
        background:rgba(10,10,10,0.7);
        padding:1px 5px;
        border-radius:4px;
      ">${topInterest}</div>` : ''}
    </div>
  `
}

function buildClusterIcon(L: any, cluster: any): any {
  const count = cluster.getChildCount()
  const size = count >= 10 ? 64 : count >= 5 ? 56 : 50
  const half = size / 2

  const html = `
    <div style="position:relative;width:${size}px;height:${size}px;cursor:pointer;">
      <!-- Outer glow ring -->
      <div style="
        position:absolute;
        inset:-10px;
        border-radius:50%;
        background:rgba(245,240,232,0.05);
        animation:bubblePulse 3s ease-in-out infinite;
        pointer-events:none;
      "></div>
      <!-- Cluster bubble -->
      <div style="
        position:relative;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:#1c1c1c;
        border:1.5px solid rgba(245,240,232,0.22);
        display:flex;align-items:center;justify-content:center;
        font-family:system-ui,sans-serif;
        font-size:${count >= 10 ? 17 : 15}px;
        font-weight:600;
        color:#F5F0E8;
        box-shadow:0 0 28px rgba(245,240,232,0.08),0 4px 16px rgba(0,0,0,0.8);
      ">${count}</div>
    </div>
  `

  return L.divIcon({
    html,
    className: 'circle-cluster-marker',
    iconSize: [size, size],
    iconAnchor: [half, half],
  })
}
