import L from 'leaflet'
import { ICONS } from '/src/settings/theme'
import allCategories from '/src/settings/categories/index'
import SVG_ICONS from './svg_icons'

export const ICON_SIZE = 12

export const POINTER_ICONS = {}

allCategories.forEach((category) => {
  POINTER_ICONS[category.name] = {
    active: new L.divIcon({
      html: SVG_ICONS[category.name](true),
    }),
    default: new L.divIcon({
      html: SVG_ICONS[category.name](),
    }),
  }
})
