"use client"

import { useEffect } from "react"

export default function PageHead({ title, description = "", ogImage = "", ogUrl = "", children }) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", description)
      } else {
        const meta = document.createElement("meta")
        meta.name = "description"
        meta.content = description
        document.head.appendChild(meta)
      }
    }

    // Update Open Graph tags
    if (ogImage) {
      updateMetaTag("property", "og:image", ogImage)
    }

    if (ogUrl) {
      updateMetaTag("property", "og:url", ogUrl)
    }

    if (title) {
      updateMetaTag("property", "og:title", title)
    }

    if (description) {
      updateMetaTag("property", "og:description", description)
    }

    // Helper function to update meta tags
    function updateMetaTag(attrName, attrValue, content) {
      const metaTag = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (metaTag) {
        metaTag.setAttribute("content", content)
      } else {
        const meta = document.createElement("meta")
        meta.setAttribute(attrName, attrValue)
        meta.content = content
        document.head.appendChild(meta)
      }
    }
  }, [title, description, ogImage, ogUrl])

  return children
}
