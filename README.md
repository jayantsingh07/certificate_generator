# HKM Mumbai Puja Video Frame Generator

A modern, elegant web application for generating customized video frames for special puja events at HKM (Hari Krishna Mandir) Mumbai. This tool allows you to create two personalized video frames (opening and closing) with participant names and dates.

## Features

- **Excel Data Import**: Upload participant lists from Excel files
- **Dual Frame Configuration**: Customize two separate video frames (opening and closing)
- **Text Positioning**: Drag-and-drop interface to position names and dates on frames
- **Styling Options**: Customize font, size, weight, and color for text elements
- **Batch Generation**: Generate all video frames at once and download as ZIP file
- **Modern UI**: Beautiful glass morphism design with smooth animations
- **Responsive**: Works seamlessly on desktop and tablet devices

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Step 1: Upload Participant List
1. Click the upload area or drag-and-drop an Excel file
2. File must contain "Name" and "Date" columns
3. Preview your data before proceeding

### Step 2: Configure Video Frames
1. Upload opening frame image
2. Upload closing frame image
3. Use "Edit Positions" to customize text placement
4. Adjust font, size, weight, and color for each text element

### Step 3: Generate Frames
1. Click "Generate All Video Frames"
2. Download the ZIP file containing all personalized frames
3. Each participant gets two frames (opening and closing)

## Excel File Format

Your Excel file should have at least these columns:
- **Name**: Participant's name
- **Date**: Event date or participant code

Example:
| Name | Date |
|------|------|
| Rajesh Kumar | 2024-03-15 |
| Priya Singh | 2024-03-15 |

## Supported Fonts

- Poppins
- Roboto
- Noto Sans
- Cinzel

## Technology Stack

- **Next.js 16**: React framework with server-side rendering
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **XLSX**: Excel file parsing
- **jszip**: ZIP file generation
- **Zustand**: State management

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page with uploader
│   ├── frames/                  # Frame configuration page
│   │   ├── page.tsx
│   │   └── components/
│   │       └── DraggableText.tsx
│   └── layout.tsx
├── components/
│   ├── PujaFrameUploader.tsx    # Participant list uploader
│   └── ui/
│       └── button.tsx
└── lib/
    ├── readPujaData.ts          # Excel parsing
    ├── pujaDataStore.ts         # State management
    └── generateFrames.ts        # Frame generation
```

## Customization

### Adding More Fonts
Edit `src/app/frames/page.tsx` and update the `FONTS` array:
```typescript
const FONTS = ["Poppins", "Roboto", "Noto Sans", "Cinzel", "Your Font"]
```

### Changing Default Styling
Modify the default state values in `src/app/frames/page.tsx`:
```typescript
const [name1Color, setName1Color] = useState("#ffffff")
```

## Development

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Design System

The application uses a modern glass morphism design with:
- Gradient backgrounds (Blue → Purple → Pink)
- Frosted glass effects with backdrop blur
- Smooth animations and transitions
- Responsive typography with Playfair Display and Inter fonts

## License

This project is created for HKM Mumbai.

## Support

For issues or questions, please contact the development team.
