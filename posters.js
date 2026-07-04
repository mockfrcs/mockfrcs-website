// MockFRCS revision poster manifest.
// To add a poster: drop the SVG in posters/<section>/, then add one entry below.
// Fields: title, file (path), section, subject (one line), free (true = open to all).
const POSTERS = [
  { title: "Colorectal polyp classification", file: "posters/colorectal/colorectal-polyp-classification.svg", section: "Colorectal", subject: "Paris · Kudo · Haggitt · Kikuchi · pT1 risk", free: true },
  { title: "Colorectal cancer — staging & rectal MRI", file: "posters/colorectal/crc-staging-rectal-mri.svg", section: "Colorectal", subject: "TNM8 · CRM · EMVI · MERCURY", free: true },
  { title: "Colorectal cancer — treatment & trials", file: "posters/colorectal/crc-treatment-and-trials.svg", section: "Colorectal", subject: "Neoadjuvant · landmark RCTs by stage", free: false },
  { title: "Colorectal cancer — molecular, surgery & margins", file: "posters/colorectal/crc-molecular-surgery-margins.svg", section: "Colorectal", subject: "MMR/MSI · targeted agents · TME", free: false },
  { title: "BSG post-polypectomy surveillance 2020", file: "posters/colorectal/bsg-post-polypectomy-surveillance-2020.svg", section: "Colorectal", subject: "High-risk criteria · intervals · post-CRC", free: false },
  { title: "Hereditary CRC syndromes", file: "posters/colorectal/hereditary-crc-syndromes.svg", section: "Colorectal", subject: "FAP · Lynch · MAP · surveillance", free: false },
  { title: "Colitis — histology & treatment", file: "posters/colorectal/colitis-histology-treatment.svg", section: "Colorectal", subject: "Microscopic · infective · drug · structural", free: false },
  { title: "Appendiceal NET", file: "posters/colorectal/appendiceal-net.svg", section: "Colorectal", subject: "Size thresholds · appendicectomy vs right hemi", free: false },
  { title: "Presacral & retrorectal tumours", file: "posters/colorectal/presacral-retrorectal-tumours.svg", section: "Colorectal", subject: "Classification · work-up · approach", free: false },
  { title: "Anal intraepithelial neoplasia", file: "posters/colorectal/anal-intraepithelial-neoplasia.svg", section: "Colorectal", subject: "LSIL/HSIL · p16 · HSIL management", free: false }
];
