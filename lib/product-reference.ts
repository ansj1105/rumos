import type { Locale } from "@/lib/site";

type ProductReference = {
  familyKo: string;
  familyEn: string;
  featuresKo: string[];
  featuresEn: string[];
  applicationsKo: string[];
  applicationsEn: string[];
  specs: Array<{ label: string; valueKo: string; valueEn: string }>;
};

export const productReferenceMap: Record<string, ProductReference> = {
  "lum-b": {
    familyKo: "광학 검사 플랫폼",
    familyEn: "Optical inspection platform",
    featuresKo: [
      "정밀 정렬이 가능한 안정적 광학 구성",
      "라인 통합에 적합한 컴팩트 구조",
      "고속 공정 대응을 위한 신호 안정성",
      "운영 환경에 맞춘 유연한 소프트웨어 연동",
    ],
    featuresEn: [
      "Stable optical configuration for precise alignment",
      "Compact structure for line integration",
      "Signal stability for high-throughput process lines",
      "Flexible software integration for operating environments",
    ],
    applicationsKo: ["반도체 검사", "표면 결함 분석", "생산 공정 품질 점검"],
    applicationsEn: ["Semiconductor inspection", "Surface defect analysis", "Production quality checks"],
    specs: [
      { label: "Integration", valueKo: "Inline / Standalone", valueEn: "Inline / Standalone" },
      { label: "Control", valueKo: "PC Software", valueEn: "PC Software" },
      { label: "Output", valueKo: "Image / Measurement Data", valueEn: "Image / Measurement Data" },
    ],
  },
  "lum-b-l": {
    familyKo: "장거리 광학 모듈",
    familyEn: "Long-range optical module",
    featuresKo: [
      "확장된 검사 거리 대응",
      "설치 유연성을 고려한 시스템 구성",
      "반복 측정 안정성 강화",
      "고정밀 광학 계측 환경 지원",
    ],
    featuresEn: [
      "Extended inspection distance support",
      "Flexible system setup for installation constraints",
      "Improved repeatability in measurement",
      "Support for precise optical metrology environments",
    ],
    applicationsKo: ["장거리 배치 검사", "넓은 공정 폭 대응", "고정밀 측정 라인"],
    applicationsEn: ["Long-range inspection", "Wide process width support", "Precision measurement lines"],
    specs: [
      { label: "Range", valueKo: "Extended Optical Range", valueEn: "Extended Optical Range" },
      { label: "Mounting", valueKo: "Flexible Layout", valueEn: "Flexible Layout" },
      { label: "Data", valueKo: "Measurement + Logging", valueEn: "Measurement + Logging" },
    ],
  },
  "lum-f": {
    familyKo: "고속 검사 라인업",
    familyEn: "High-speed inspection line",
    featuresKo: [
      "빠른 판독과 신뢰성 있는 측정 결과",
      "라인 속도에 맞춘 처리 효율",
      "운영 데이터 축적과 추적성 강화",
      "품질 판정 자동화 환경에 적합",
    ],
    featuresEn: [
      "Fast readout with reliable measurement output",
      "Processing efficiency aligned with line speed",
      "Improved traceability through operational data capture",
      "Suitable for automated quality decision environments",
    ],
    applicationsKo: ["고속 생산라인", "자동 판정 공정", "실시간 품질 추적"],
    applicationsEn: ["High-speed production lines", "Automated decision processes", "Real-time quality tracking"],
    specs: [
      { label: "Speed", valueKo: "High-throughput", valueEn: "High-throughput" },
      { label: "Mode", valueKo: "Realtime Inspection", valueEn: "Realtime Inspection" },
      { label: "Report", valueKo: "Traceable Logs", valueEn: "Traceable Logs" },
    ],
  },
  "lum-z": {
    familyKo: "정밀 포커싱 라인업",
    familyEn: "Precision focusing line",
    featuresKo: [
      "미세 포인트 검출과 정렬 정확도 향상",
      "작은 공정 편차 감지",
      "고신뢰 반복 작업 환경 대응",
      "품질 기준 일관성 확보",
    ],
    featuresEn: [
      "Improved fine-point detection and alignment accuracy",
      "Detection of small process variations",
      "Support for reliable repeated operation",
      "Consistent quality criteria across production",
    ],
    applicationsKo: ["미세 패턴 공정", "고정밀 정렬", "반복 검증 작업"],
    applicationsEn: ["Fine-pattern processing", "High-precision alignment", "Repeat verification tasks"],
    specs: [
      { label: "Precision", valueKo: "Fine Alignment", valueEn: "Fine Alignment" },
      { label: "Stability", valueKo: "Repeatable Operation", valueEn: "Repeatable Operation" },
      { label: "Use Case", valueKo: "Precision Process", valueEn: "Precision Process" },
    ],
  },
  ifi: {
    familyKo: "Infinity Flat Top 광학 모듈",
    familyEn: "Infinity Flat Top optical module",
    featuresKo: [
      "Maintain a superior beam UNIFORMITY OF OVER 90% across all focal ranges, ensuring consistent process quality",
      "Infinity flat top along with NA",
    ],
    featuresEn: [
      "Maintain a superior beam UNIFORMITY OF OVER 90% across all focal ranges, ensuring consistent process quality",
      "Infinity flat top along with NA",
    ],
    applicationsKo: ["Beam shaping", "Uniform process window", "Infinity area projection"],
    applicationsEn: ["Beam shaping", "Uniform process window", "Infinity area projection"],
    specs: [
      { label: "Beam Profile", valueKo: "Flat Top Square", valueEn: "Flat Top Square" },
      { label: "Uniformity", valueKo: "> 90", valueEn: "> 90" },
      { label: "Operating Temperature [°C]", valueKo: "0 to 60", valueEn: "0 to 60" },
    ],
  },
  software: {
    familyKo: "운영 소프트웨어",
    familyEn: "Operation software",
    featuresKo: [
      "제품 제어와 측정 데이터 시각화",
      "운영자 중심 UI와 리포트 기능",
      "검사 이력 관리",
      "장비 확장에 맞춘 모듈형 구성",
    ],
    featuresEn: [
      "Product control with measurement visualization",
      "Operator-focused UI and reporting",
      "Inspection history management",
      "Modular setup for equipment expansion",
    ],
    applicationsKo: ["장비 제어", "리포팅", "운영 데이터 관리"],
    applicationsEn: ["Equipment control", "Reporting", "Operational data management"],
    specs: [
      { label: "Platform", valueKo: "Windows / Industrial PC", valueEn: "Windows / Industrial PC" },
      { label: "Function", valueKo: "Control / Logging / Report", valueEn: "Control / Logging / Report" },
      { label: "Integration", valueKo: "Device-ready", valueEn: "Device-ready" },
    ],
  },
};

export function getProductReference(slug: string, locale: Locale) {
  const reference = productReferenceMap[slug] ?? productReferenceMap["lum-b"];

  return {
    family: locale === "ko" ? reference.familyKo : reference.familyEn,
    features: locale === "ko" ? reference.featuresKo : reference.featuresEn,
    applications: locale === "ko" ? reference.applicationsKo : reference.applicationsEn,
    specs: reference.specs.map((spec) => ({
      label: spec.label,
      value: locale === "ko" ? spec.valueKo : spec.valueEn,
    })),
  };
}
