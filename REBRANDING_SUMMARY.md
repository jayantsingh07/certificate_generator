# Project Rebranding Summary: Certificate Generator → HKM Mumbai Puja Video Frame Generator

## Overview
The project has been completely rebranded and refactored from a generic "Certificate Generator" to a specialized **"HKM Mumbai Puja Video Frame Generator"** - a tool for creating two personalized video frames for special puja events at Hari Krishna Mandir (HKM) Mumbai.

## File Changes

### Renamed Files

#### Core Library Files
1. **readExcel.ts** → **readPujaData.ts**
   - Function: `readExcel()` → `readPujaData()`
   - Type: `ExcelRow` → `PujaParticipant`
   - Purpose: Parse participant list from Excel files

2. **excelStore.ts** → **pujaDataStore.ts**
   - Hook: `useExcelStore()` → `usePujaDataStore()`
   - State: `rows` → `participants`
   - Message: "Excel" terminology removed, replaced with "Puja" context

3. **generateTemplates.ts** → **generateFrames.ts**
   - Function: `generateCertificates()` → `generatePujaFrames()`
   - Parameters: `rows` → `participants`
   - File output: "Generated.zip" → "PujaFrames.zip"
   - Text: "TEMPLATE" → "FRAME" (opening/closing)

4. **src/components/ExcelUploader.tsx** → **src/components/PujaFrameUploader.tsx**
   - Component: `ExcelUploader()` → `PujaFrameUploader()`
   - Header: "Certificate Generator" → "HKM Puja Video Frames"
   - Description updated to describe puja video frame generation

#### Page Routes
1. **src/app/templates/page.tsx** → **src/app/frames/page.tsx**
   - Component: `TemplatesPage()` → `PujaFramesPage()`
   - Title: "Customize Templates" → "Customize Video Frames"
   - Step indicator: "Step 2 of 3" → "Step 2 of 2"
   - Button text: "Generate All Certificates" → "Generate All Video Frames"
   - Frame labels: "Template 1/2" → "Opening Frame/Closing Frame"

2. **src/app/templates/components/DraggableText.tsx** → **src/app/frames/components/DraggableText.tsx**
   - Functionality unchanged, location updated to match new structure

### Deleted Files (Cleanup)
- src/app/templates/ (entire directory - replaced by frames/)
- src/lib/excelStore.ts (replaced by pujaDataStore.ts)
- src/lib/generateTemplates.ts (replaced by generateFrames.ts)
- src/lib/readExcel.ts (replaced by readPujaData.ts)
- src/components/ExcelUploader.tsx (replaced by PujaFrameUploader.tsx)

### Modified Files

#### src/app/page.tsx
- Import: `ExcelUploader` → `PujaFrameUploader`
- Component instance updated

#### README.md
- Complete rewrite with:
  - New project title and description
  - Puja event context
  - Updated features list focusing on video frames
  - Instructions for Excel format (Name, Date columns)
  - Project structure reflecting new naming
  - Technology stack remains the same

## Type & Variable Renamings

### Type Definitions
- `ExcelRow` → `PujaParticipant`
  - Structure: `{ name: string, date: string }`
  - Represents individual participant data

### State Management
- `useExcelStore` → `usePujaDataStore`
- Store properties:
  - `rows` → `participants`
  - `setRows()` → `setParticipants()`
  - `clearRows()` → `clearParticipants()`

### Component Properties & Variables
- `template1`, `template2` → `frame1`, `frame2`
- `handleimage1`, `handleimage2` → `handleFrame1`, `handleFrame2`
- `setTemplate1`, `setTemplate2` → `setFrame1`, `setFrame2`
- `image1`, `image2` → No change (represents the preview URLs)

### UI Text Updates
- "Certificate Generator" → "HKM Puja Video Frames"
- "Upload templates and customize..." → "Upload frames and customize...for HKM Puja"
- "Certificate" → "Video Frame" (in all UI elements)
- "Download certificates" → "Download video frames"
- "frame1_image1.png" → "frame1_frame1.png"
- "frame2_image2.png" → "frame2_frame2.png"

## Functional Changes

### ZIP File Generation
- Output filename: `Generated.zip` → `PujaFrames.zip`
- File naming in ZIP: `{name}_image1.png`, `{name}_image2.png` → `{name}_frame1.png`, `{name}_frame2.png`

### UI/UX Improvements
- All references to "templates" replaced with "frames"
- Frame descriptions: 
  - "Template 1" → "Opening Frame"
  - "Template 2" → "Closing Frame"
- Step indicator updated to "Step 2 of 2" (clearer workflow)
- Info cards updated with puja context

## Verification

✓ All imports updated
✓ All type references updated  
✓ All UI text rebranded
✓ Build passes without errors
✓ Routes updated: /templates → /frames
✓ Old files properly removed
✓ No broken dependencies

## Remaining Old Files (Kept for Reference)
None - all old files have been properly replaced or removed.

## Next Steps (Optional)
1. Update MODERN_UI_DESIGN.md if needed
2. Consider adding puja-specific colors or design elements
3. Test the application in browser to verify all flows work correctly
4. Deploy to production when ready
