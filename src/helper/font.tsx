import { Font } from "@react-pdf/renderer";

export async function loadFonts() {
  try {
    Font.register({
      family: "DM Sans",
      fonts: [
        // Normal variants
        {
          src: "static/fonts/dm-sans/DMSans-Thin.ttf",
          fontWeight: 100,
        },
        {
          src: "static/fonts/dm-sans/DMSans-ExtraLight.ttf",
          fontWeight: 200,
        },
        {
          src: "static/fonts/dm-sans/DMSans-Light.ttf",
          fontWeight: 300,
        },
        {
          src: "static/fonts/dm-sans/DMSans-Regular.ttf",
          fontWeight: 400,
        },
        {
          src: "static/fonts/dm-sans/DMSans-Medium.ttf",
          fontWeight: 500,
        },
        {
          src: "static/fonts/dm-sans/DMSans-SemiBold.ttf",
          fontWeight: 600,
        },
        {
          src: "static/fonts/dm-sans/DMSans-Bold.ttf",
          fontWeight: 700,
        },
        {
          src: "static/fonts/dm-sans/DMSans-ExtraBold.ttf",
          fontWeight: 800,
        },
        {
          src: "static/fonts/dm-sans/DMSans-Black.ttf",
          fontWeight: 900,
        },
        // Italic variants
        {
          src: "static/fonts/dm-sans/DMSans-ThinItalic.ttf",
          fontWeight: 100,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-ExtraLightItalic.ttf",
          fontWeight: 200,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-LightItalic.ttf",
          fontWeight: 300,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-Italic.ttf",
          fontWeight: 400,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-MediumItalic.ttf",
          fontWeight: 500,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
          fontWeight: 600,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-BoldItalic.ttf",
          fontWeight: 700,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-ExtraBoldItalic.ttf",
          fontWeight: 800,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/dm-sans/DMSans-BlackItalic.ttf",
          fontWeight: 900,
          fontStyle: "italic",
        },
      ],
    });

    Font.register({
      family: "JetBrains Mono",
      fonts: [
        // Normal weights
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-Thin.ttf",
          fontWeight: 100,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-ExtraLight.ttf",
          fontWeight: 200,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-Light.ttf",
          fontWeight: 300,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-Regular.ttf",
          fontWeight: 400,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-Medium.ttf",
          fontWeight: 500,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-SemiBold.ttf",
          fontWeight: 600,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-Bold.ttf",
          fontWeight: 700,
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-ExtraBold.ttf",
          fontWeight: 800,
        },

        // Italic variants
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-ThinItalic.ttf",
          fontWeight: 100,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-ExtraLightItalic.ttf",
          fontWeight: 200,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-LightItalic.ttf",
          fontWeight: 300,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-Italic.ttf",
          fontWeight: 400,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-MediumItalic.ttf",
          fontWeight: 500,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-SemiBoldItalic.ttf",
          fontWeight: 600,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-BoldItalic.ttf",
          fontWeight: 700,
          fontStyle: "italic",
        },
        {
          src: "static/fonts/jetbrains-mono/JetBrainsMono-ExtraBoldItalic.ttf",
          fontWeight: 800,
          fontStyle: "italic",
        },
      ],
    });

    console.log("DM Sans fonts loaded successfully");
  } catch (error) {
    console.error("Failed to load DM Sans fonts:", error);
    Font.register({
      family: "DM Sans",
      fonts: [{ src: "Helvetica" }, { src: "Helvetica-Bold", fontWeight: 700 }],
    });
  }
}
