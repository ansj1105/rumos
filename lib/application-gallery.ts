export type ApplicationGalleryImage = {
  src: string;
  alt: string;
};

export const applicationGalleryImages: Record<string, ApplicationGalleryImage[]> = {
  semiconductor: [
    { src: "/applications/gallery/semiconductor/laser-soldering.jpg", alt: "Semiconductor laser soldering" },
    { src: "/applications/gallery/semiconductor/wafer-process.jpg", alt: "Semiconductor wafer process" },
    { src: "/applications/gallery/semiconductor/beam-profile.png", alt: "Semiconductor beam profile" },
    { src: "/applications/gallery/semiconductor/stealth-dicing.png", alt: "Semiconductor stealth dicing" },
    { src: "/applications/gallery/semiconductor/tgv-process.png", alt: "Semiconductor TGV process" },
    { src: "/applications/gallery/semiconductor/micro-processing.png", alt: "Semiconductor micro processing" },
    { src: "/applications/gallery/semiconductor/cmos-measurement.png", alt: "Semiconductor CMOS measurement" },
    { src: "/applications/gallery/semiconductor/optics-measurement.png", alt: "Semiconductor optics measurement" },
    { src: "/applications/gallery/semiconductor/inspection-line.jpg", alt: "Semiconductor inspection line" },
  ],
  "automotive-lidar": [
    { src: "/applications/gallery/automotive-lidar/battery-welding.png", alt: "Automotive battery welding" },
    { src: "/applications/gallery/automotive-lidar/vcsel-lidar.jpg", alt: "VCSEL LiDAR inspection" },
  ],
  "oled-display": [
    { src: "/applications/gallery/oled-display/oled-process-01.jpg", alt: "OLED display process" },
    { src: "/applications/gallery/oled-display/oled-process-02.jpg", alt: "OLED display inspection" },
    { src: "/applications/gallery/oled-display/oled-process-03.jpg", alt: "OLED display laser process" },
    { src: "/applications/gallery/oled-display/oled-process-04.png", alt: "OLED display beam process" },
    { src: "/applications/gallery/oled-display/oled-process-05.png", alt: "OLED display production process" },
    { src: "/applications/gallery/oled-display/beam-splitting.jpg", alt: "OLED beam splitting" },
    { src: "/applications/gallery/oled-display/laser-hole-drilling.png", alt: "OLED laser hole drilling" },
    { src: "/applications/gallery/oled-display/lift-off.png", alt: "OLED laser lift off" },
    { src: "/applications/gallery/oled-display/micro-led.png", alt: "Micro LED process" },
    { src: "/applications/gallery/oled-display/utg-cutting.png", alt: "UTG cutting process" },
  ],
  aoi: [
    { src: "/applications/gallery/aoi/aoi-process-01.jpg", alt: "AOI process" },
    { src: "/applications/gallery/aoi/aoi-process-02.jpg", alt: "AOI inspection" },
    { src: "/applications/gallery/aoi/axicon-measurement.jpg", alt: "AOI axicon measurement" },
    { src: "/applications/gallery/aoi/initial-laser-alignment.png", alt: "Initial laser alignment" },
  ],
};
