# Home Sync Pro

## Current State

The platform detail pages (Google Home, Amazon Alexa, Apple HomeKit, Samsung SmartThings) display compatible devices organized by category. Each device is currently displayed as either:
- A static image with device name below (for featured devices with images)
- A Badge component with just the device name (for devices without images)

## Requested Changes (Diff)

### Add
- Clickable link functionality to every device listed on all platform pages
- Official product website URLs for all devices across all four platforms
- Interactive button/link behavior with hover states

### Modify
- Transform device display elements into clickable links that open the manufacturer's official product page in a new tab
- Update both image-based device displays and badge-based device displays to include link functionality
- Maintain existing visual styling while adding interactive link behavior

### Remove
- None

## Implementation Plan

1. Add URL field to each device in the platformsData object for all four platforms (Google Home, Amazon Alexa, Apple HomeKit, Samsung SmartThings)
2. Update the Device interface to include optional `url?: string` field
3. Wrap device elements (both image displays and badges) in clickable link components that:
   - Open in new tab (target="_blank" with rel="noopener noreferrer")
   - Show appropriate hover/click visual feedback
   - Maintain existing image/badge styling
4. Ensure all devices have their corresponding manufacturer product page URLs

## UX Notes

- Links should open in new tabs to preserve user's browsing context
- Hover states should clearly indicate clickability
- Maintain current visual hierarchy and spacing
- Device images should remain visually prominent with subtle indication of interactivity
