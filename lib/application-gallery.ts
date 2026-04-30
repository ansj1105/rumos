export type ApplicationGalleryAsset = {
  src: string;
  alt: string;
};

export type ApplicationGalleryItem = {
  title: string;
  description: string;
  images: ApplicationGalleryAsset[];
};

export const applicationGalleryImages: Record<string, ApplicationGalleryItem[]> = {
  semiconductor: [
    {
      title: "Laser Soldering",
      description: "Validating the raw laser mode and output stability prior to fiber coupling for high-precision soldering.",
      images: [
        { src: "/applications/gallery/semiconductor/laser-soldering.jpg", alt: "Semiconductor laser soldering" },
        { src: "/applications/gallery/semiconductor/optics-measurement.png", alt: "Laser soldering beam measurement" },
      ],
    },
    {
      title: "Wafer Annealing",
      description: "Eliminates hot spots and cold spots, reducing thermal defects on the wafer and ensuring uniform chip quality.",
      images: [
        { src: "/applications/gallery/semiconductor/wafer-process.jpg", alt: "Wafer annealing process" },
        { src: "/applications/gallery/semiconductor/cmos-measurement.png", alt: "Wafer annealing beam analysis" },
      ],
    },
    {
      title: "TGV",
      description: "Tuning focal precision for localized glass modification to create flawless micro-vias in next-generation substrates.",
      images: [
        { src: "/applications/gallery/semiconductor/tgv-process.png", alt: "TGV process" },
        { src: "/applications/gallery/semiconductor/beam-profile.png", alt: "TGV beam profile" },
      ],
    },
    {
      title: "Wafer Grooving & Dicing",
      description: "Ensuring perfect beam symmetry and focal spot size to minimize chipping during semiconductor wafer separation.",
      images: [
        { src: "/applications/gallery/semiconductor/stealth-dicing.png", alt: "Wafer grooving and dicing" },
        { src: "/applications/gallery/semiconductor/micro-processing.png", alt: "Wafer micro processing" },
      ],
    },
  ],
  "automotive-lidar": [
    {
      title: "VCSEL",
      description: "Evaluating the radiation pattern and overall beam quality of diffused light sources for 3D sensing and autonomous driving.",
      images: [
        { src: "/applications/gallery/automotive-lidar/vcsel-1.png", alt: "VCSEL beam pattern" },
        { src: "/applications/gallery/automotive-lidar/vcsel-2.jpg", alt: "VCSEL inspection setup" },
      ],
    },
  ],
  "oled-display": [
    {
      title: "High-Speed Beam Splitting",
      description: "Verifying the symmetry and quality of the raw laser beam before splitting for simultaneous high-speed glass cutting.",
      images: [
        { src: "/applications/gallery/oled-display/high-speed-beam-splitting-1.jpg", alt: "High-speed beam splitting process" },
        { src: "/applications/gallery/oled-display/high-speed-beam-splitting-2.jpg", alt: "High-speed beam splitting beam result" },
      ],
    },
    {
      title: "Laser Hole Drilling",
      description: "A high-precision, non-contact laser machining solution utilizing focused beams to create highly accurate micro-holes across various materials.",
      images: [
        { src: "/applications/gallery/oled-display/laser-hole-drilling-1.png", alt: "Laser hole drilling process" },
        { src: "/applications/gallery/oled-display/laser-hole-drilling-2.png", alt: "Laser hole drilling result" },
      ],
    },
    {
      title: "Laser Lift-Off",
      description: "An efficient DPSS laser system that reliably separates flexible display panels from carrier glass while minimizing maintenance costs.",
      images: [
        { src: "/applications/gallery/oled-display/laser-lift-off-1.jpg", alt: "Laser lift-off process" },
        { src: "/applications/gallery/oled-display/laser-lift-off-2.png", alt: "Laser lift-off beam result" },
      ],
    },
    {
      title: "Micro LED",
      description: "Verifying the energy profile of large surface light sources for the flawless mass transfer of micro-LED chips.",
      images: [
        { src: "/applications/gallery/oled-display/micro-led-1.jpg", alt: "Micro LED process" },
        { src: "/applications/gallery/oled-display/micro-led-2.png", alt: "Micro LED beam measurement" },
      ],
    },
    {
      title: "UTG Cutting",
      description: "Measuring micro-scale focal spot size and shape to prevent micro-cracks in ultra-thin glass processing.",
      images: [
        { src: "/applications/gallery/oled-display/utg-cutting-1.png", alt: "UTG cutting process" },
        { src: "/applications/gallery/oled-display/utg-cutting-2.png", alt: "UTG cutting beam result" },
      ],
    },
  ],
  aoi: [
    {
      title: "Laser Source QA & R&D",
      description: "Assessing the fundamental beam specifications and energy distribution of laser oscillators for R&D and quality assurance.",
      images: [
        { src: "/applications/gallery/aoi/laser-source-qa-rd-1.jpg", alt: "Laser source QA and R&D setup" },
        { src: "/applications/gallery/aoi/laser-source-qa-rd-2.jpg", alt: "Laser source QA beam analysis" },
      ],
    },
    {
      title: "Initial Laser Alignment",
      description: "Establishing the absolute reference axis and straightness of the raw beam for accurate optical system setup.",
      images: [
        { src: "/applications/gallery/aoi/initial-laser-alignment-1.jpg", alt: "Initial laser alignment setup" },
        { src: "/applications/gallery/aoi/initial-laser-alignment-2.png", alt: "Initial laser alignment beam result" },
      ],
    },
  ],
};
