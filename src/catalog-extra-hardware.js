/** Additional real hardware, checked 2026-10-30 against manufacturer pages.
 * Prices and performance/cooling indices are simulation inputs, not store offers
 * or measured benchmarks. Missing optional specs are explicitly listed, never guessed.
 * See docs/HARDWARE_EXPANSION.md for source provenance and conditional clearances.
 */
export const extraHardwareProducts = [
  {
    "id": "extra-msi-geforce-gtx-1650-d6-ventus-xs-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce GTX 1650 D6 VENTUS XS OC",
    "price": 13000,
    "chipBrand": "NVIDIA",
    "vram": 4,
    "power": 75,
    "recommendedPsu": 300,
    "length": 178.0,
    "width": 111.0,
    "thickness": 38.0,
    "powerConnector": "PCIe slot",
    "score": 22,
    "specs": [
      "4 ГБ · 75 Вт",
      "178 мм · PCIe slot",
      "Толщина 38 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-GTX-1650-D6-VENTUS-XS-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-gtx-1660-super-ventus-xs-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce GTX 1660 SUPER VENTUS XS OC",
    "price": 17000,
    "chipBrand": "NVIDIA",
    "vram": 6,
    "power": 125,
    "recommendedPsu": 450,
    "length": 204.0,
    "width": 128.0,
    "thickness": 42.0,
    "powerConnector": "8-pin",
    "score": 31,
    "specs": [
      "6 ГБ · 125 Вт",
      "204 мм · 8-pin",
      "Толщина 42 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-GTX-1660-SUPER-VENTUS-XS-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-2060-ventus-gp-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 2060 VENTUS GP OC",
    "price": 18500,
    "chipBrand": "NVIDIA",
    "vram": 6,
    "power": 160,
    "recommendedPsu": 500,
    "length": 231.0,
    "width": 128.0,
    "thickness": 42.0,
    "powerConnector": "8-pin",
    "score": 34,
    "specs": [
      "6 ГБ · 160 Вт",
      "231 мм · 8-pin",
      "Толщина 42 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-2060-VENTUS-GP-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-2060-super-ventus-gp-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 2060 SUPER VENTUS GP OC",
    "price": 19900,
    "chipBrand": "NVIDIA",
    "vram": 8,
    "power": 184,
    "recommendedPsu": 550,
    "length": 232.0,
    "width": 127.0,
    "thickness": 42.0,
    "powerConnector": "8-pin",
    "score": 40,
    "specs": [
      "8 ГБ · 184 Вт",
      "232 мм · 8-pin",
      "Толщина 42 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-2060-SUPER-VENTUS-GP-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-2070-super-ventus-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 2070 SUPER VENTUS OC",
    "price": 23000,
    "chipBrand": "NVIDIA",
    "vram": 8,
    "power": 215,
    "recommendedPsu": 650,
    "length": 257.0,
    "width": 127.0,
    "thickness": 41.0,
    "powerConnector": "8-pin + 6-pin",
    "score": 45,
    "specs": [
      "8 ГБ · 215 Вт",
      "257 мм · 8-pin + 6-pin",
      "Толщина 41 мм"
    ],
    "requiredPcieConnectors": 2,
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-2070-SUPER-VENTUS-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3050-ventus-2x-8g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3050 VENTUS 2X 8G OC",
    "price": 21000,
    "chipBrand": "NVIDIA",
    "vram": 8,
    "power": 130,
    "recommendedPsu": 550,
    "length": 235.0,
    "width": 124.0,
    "thickness": 42.0,
    "powerConnector": "8-pin",
    "score": 32,
    "specs": [
      "8 ГБ · 130 Вт",
      "235 мм · 8-pin",
      "Толщина 42 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3050-VENTUS-2X-8G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3060-ti-ventus-2x-8g-ocv1-lhr",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3060 Ti VENTUS 2X 8G OCV1 LHR",
    "price": 32000,
    "chipBrand": "NVIDIA",
    "vram": 8,
    "power": 200,
    "recommendedPsu": 600,
    "length": 235.0,
    "width": 124.0,
    "thickness": 42.0,
    "powerConnector": "8-pin",
    "score": 59,
    "specs": [
      "8 ГБ · 200 Вт",
      "235 мм · 8-pin",
      "Толщина 42 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3060-Ti-VENTUS-2X-8G-OCV1-LHR/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3070-ventus-2x-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3070 VENTUS 2X OC",
    "price": 36900,
    "chipBrand": "NVIDIA",
    "vram": 8,
    "power": 220,
    "recommendedPsu": 650,
    "length": 232.0,
    "width": 124.0,
    "thickness": 52.0,
    "powerConnector": "2×8-pin",
    "score": 70,
    "specs": [
      "8 ГБ · 220 Вт",
      "232 мм · 2×8-pin",
      "Толщина 52 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3070-VENTUS-2X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3070-ti-ventus-3x-8g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3070 Ti VENTUS 3X 8G OC",
    "price": 39000,
    "chipBrand": "NVIDIA",
    "vram": 8,
    "power": 290,
    "recommendedPsu": 750,
    "length": 305.0,
    "width": 120.0,
    "thickness": 57.0,
    "powerConnector": "2×8-pin",
    "score": 75,
    "specs": [
      "8 ГБ · 290 Вт",
      "305 мм · 2×8-pin",
      "Толщина 57 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3070-Ti-VENTUS-3X-8G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3080-ventus-3x-10g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3080 VENTUS 3X 10G OC",
    "price": 48500,
    "chipBrand": "NVIDIA",
    "vram": 10,
    "power": 320,
    "recommendedPsu": 750,
    "length": 305.0,
    "width": 120.0,
    "thickness": 57.0,
    "powerConnector": "2×8-pin",
    "score": 89,
    "specs": [
      "10 ГБ · 320 Вт",
      "305 мм · 2×8-pin",
      "Толщина 57 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3080-VENTUS-3X-10G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3080-ti-ventus-3x-12g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3080 Ti VENTUS 3X 12G OC",
    "price": 55000,
    "chipBrand": "NVIDIA",
    "vram": 12,
    "power": 350,
    "recommendedPsu": 750,
    "length": 305.0,
    "width": 120.0,
    "thickness": 57.0,
    "powerConnector": "2×8-pin",
    "score": 103,
    "specs": [
      "12 ГБ · 350 Вт",
      "305 мм · 2×8-pin",
      "Толщина 57 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3080-Ti-VENTUS-3X-12G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-3090-ventus-3x-24g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 3090 VENTUS 3X 24G OC",
    "price": 79000,
    "chipBrand": "NVIDIA",
    "vram": 24,
    "power": 350,
    "recommendedPsu": 750,
    "length": 305.0,
    "width": 120.0,
    "thickness": 57.0,
    "powerConnector": "2×8-pin",
    "score": 105,
    "specs": [
      "24 ГБ · 350 Вт",
      "305 мм · 2×8-pin",
      "Толщина 57 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-3090-VENTUS-3X-24G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4070-ventus-2x-12g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4070 VENTUS 2X 12G OC",
    "price": 57900,
    "chipBrand": "NVIDIA",
    "vram": 12,
    "power": 200,
    "recommendedPsu": 650,
    "length": 242.0,
    "width": 125.0,
    "thickness": 43.0,
    "powerConnector": "8-pin",
    "score": 86,
    "specs": [
      "12 ГБ · 200 Вт",
      "242 мм · 8-pin",
      "Толщина 43 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4070-VENTUS-2X-12G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4070-ti-ventus-3x-12g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4070 Ti VENTUS 3X 12G OC",
    "price": 79900,
    "chipBrand": "NVIDIA",
    "vram": 12,
    "power": 285,
    "recommendedPsu": 700,
    "length": 308.0,
    "width": 123.0,
    "thickness": 51.0,
    "powerConnector": "12VHPWR",
    "score": 115,
    "specs": [
      "12 ГБ · 285 Вт",
      "308 мм · 12VHPWR",
      "Толщина 51 мм"
    ],
    "adapterPcie8": 2,
    "note": "16-pin: проверь штатный кабель или комплектный адаптер и отдельные PCIe-кабели.",
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4070-Ti-VENTUS-3X-12G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4080-16gb-ventus-3x-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4080 16GB VENTUS 3X OC",
    "price": 109000,
    "chipBrand": "NVIDIA",
    "vram": 16,
    "power": 320,
    "recommendedPsu": 750,
    "length": 322.0,
    "width": 136.0,
    "thickness": 63.0,
    "powerConnector": "12VHPWR",
    "score": 138,
    "specs": [
      "16 ГБ · 320 Вт",
      "322 мм · 12VHPWR",
      "Толщина 63 мм"
    ],
    "adapterPcie8": 3,
    "note": "16-pin: проверь штатный кабель или комплектный адаптер и отдельные PCIe-кабели.",
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4080-16GB-VENTUS-3X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4090-ventus-3x-24g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4090 VENTUS 3X 24G OC",
    "price": 210000,
    "chipBrand": "NVIDIA",
    "vram": 24,
    "power": 450,
    "recommendedPsu": 850,
    "length": 322.0,
    "width": 136.0,
    "thickness": 62.0,
    "powerConnector": "12VHPWR",
    "score": 180,
    "specs": [
      "24 ГБ · 450 Вт",
      "322 мм · 12VHPWR",
      "Толщина 62 мм"
    ],
    "adapterPcie8": 3,
    "note": "16-pin: проверь штатный кабель или комплектный адаптер и отдельные PCIe-кабели.",
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4090-VENTUS-3X-24G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4070-super-12g-ventus-2x-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4070 SUPER 12G VENTUS 2X OC",
    "price": 67900,
    "chipBrand": "NVIDIA",
    "vram": 12,
    "power": 220,
    "recommendedPsu": 650,
    "length": 242.0,
    "width": 125.0,
    "thickness": 43.0,
    "powerConnector": "12VHPWR",
    "score": 100,
    "specs": [
      "12 ГБ · 220 Вт",
      "242 мм · 12VHPWR",
      "Толщина 43 мм"
    ],
    "adapterPcie8": 2,
    "note": "16-pin: проверь штатный кабель или комплектный адаптер и отдельные PCIe-кабели.",
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4070-SUPER-12G-VENTUS-2X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4070-ti-super-16g-ventus-3x-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4070 Ti SUPER 16G VENTUS 3X OC",
    "price": 92900,
    "chipBrand": "NVIDIA",
    "vram": 16,
    "power": 285,
    "recommendedPsu": 700,
    "length": 308.0,
    "width": 120.0,
    "thickness": 50.0,
    "powerConnector": "12VHPWR",
    "score": 124,
    "specs": [
      "16 ГБ · 285 Вт",
      "308 мм · 12VHPWR",
      "Толщина 50 мм"
    ],
    "adapterPcie8": 2,
    "note": "16-pin: проверь штатный кабель или комплектный адаптер и отдельные PCIe-кабели.",
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4070-Ti-SUPER-16G-VENTUS-3X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4080-super-16g-ventus-3x-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4080 SUPER 16G VENTUS 3X OC",
    "price": 119000,
    "chipBrand": "NVIDIA",
    "vram": 16,
    "power": 320,
    "recommendedPsu": 750,
    "length": 322.0,
    "width": 136.0,
    "thickness": 62.0,
    "powerConnector": "12VHPWR",
    "score": 140,
    "specs": [
      "16 ГБ · 320 Вт",
      "322 мм · 12VHPWR",
      "Толщина 62 мм"
    ],
    "adapterPcie8": 3,
    "note": "16-pin: проверь штатный кабель или комплектный адаптер и отдельные PCIe-кабели.",
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4080-SUPER-16G-VENTUS-3X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-geforce-rtx-4060-ti-gaming-x-slim-16g",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 4060 Ti GAMING X SLIM 16G",
    "price": 47900,
    "chipBrand": "NVIDIA",
    "vram": 16,
    "power": 165,
    "recommendedPsu": 550,
    "length": 307.0,
    "width": 125.0,
    "thickness": 46.0,
    "powerConnector": "8-pin",
    "score": 69,
    "specs": [
      "16 ГБ · 165 Вт",
      "307 мм · 8-pin",
      "Толщина 46 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-4060-Ti-GAMING-X-SLIM-16G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6600-mech-2x-8g",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6600 MECH 2X 8G",
    "price": 22900,
    "chipBrand": "AMD",
    "vram": 8,
    "power": 132,
    "recommendedPsu": 500,
    "length": 235.0,
    "width": 125.0,
    "thickness": 46.0,
    "powerConnector": "8-pin",
    "score": 42,
    "specs": [
      "8 ГБ · 132 Вт",
      "235 мм · 8-pin",
      "Толщина 46 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6600-MECH-2X-8G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6600-xt-mech-2x-8g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6600 XT MECH 2X 8G OC",
    "price": 25900,
    "chipBrand": "AMD",
    "vram": 8,
    "power": 160,
    "recommendedPsu": 500,
    "length": 235.0,
    "width": 125.0,
    "thickness": 46.0,
    "powerConnector": "8-pin",
    "score": 51,
    "specs": [
      "8 ГБ · 160 Вт",
      "235 мм · 8-pin",
      "Толщина 46 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6600-XT-MECH-2X-8G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6650-xt-mech-2x-8g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6650 XT MECH 2X 8G OC",
    "price": 27900,
    "chipBrand": "AMD",
    "vram": 8,
    "power": 175,
    "recommendedPsu": 500,
    "length": 235.0,
    "width": 125.0,
    "thickness": 47.0,
    "powerConnector": "8-pin",
    "score": 54,
    "specs": [
      "8 ГБ · 175 Вт",
      "235 мм · 8-pin",
      "Толщина 47 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6650-XT-MECH-2X-8G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6700-xt-mech-2x-12g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6700 XT MECH 2X 12G OC",
    "price": 32900,
    "chipBrand": "AMD",
    "vram": 12,
    "power": 230,
    "recommendedPsu": 650,
    "length": 247.0,
    "width": 131.0,
    "thickness": 51.0,
    "powerConnector": "2×8-pin",
    "score": 66,
    "specs": [
      "12 ГБ · 230 Вт",
      "247 мм · 2×8-pin",
      "Толщина 51 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6700-XT-MECH-2X-12G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6750-xt-mech-2x-12g-oc",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6750 XT MECH 2X 12G OC",
    "price": 35900,
    "chipBrand": "AMD",
    "vram": 12,
    "power": 250,
    "recommendedPsu": 650,
    "length": 249.0,
    "width": 132.0,
    "thickness": 52.0,
    "powerConnector": "2×8-pin",
    "score": 71,
    "specs": [
      "12 ГБ · 250 Вт",
      "249 мм · 2×8-pin",
      "Толщина 52 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6750-XT-MECH-2X-12G-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6800-gaming-x-trio-16g",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6800 GAMING X TRIO 16G",
    "price": 42900,
    "chipBrand": "AMD",
    "vram": 16,
    "power": 250,
    "recommendedPsu": 650,
    "length": 324.0,
    "width": 141.0,
    "thickness": 55.0,
    "powerConnector": "2×8-pin",
    "score": 85,
    "specs": [
      "16 ГБ · 250 Вт",
      "324 мм · 2×8-pin",
      "Толщина 55 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6800-GAMING-X-TRIO-16G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6800-xt-gaming-x-trio-16g",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6800 XT GAMING X TRIO 16G",
    "price": 47900,
    "chipBrand": "AMD",
    "vram": 16,
    "power": 300,
    "recommendedPsu": 750,
    "length": 324.0,
    "width": 141.0,
    "thickness": 55.0,
    "powerConnector": "2×8-pin",
    "score": 100,
    "specs": [
      "16 ГБ · 300 Вт",
      "324 мм · 2×8-pin",
      "Толщина 55 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6800-XT-GAMING-X-TRIO-16G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-6900-xt-gaming-x-trio-16g",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 6900 XT GAMING X TRIO 16G",
    "price": 52900,
    "chipBrand": "AMD",
    "vram": 16,
    "power": 300,
    "recommendedPsu": 850,
    "length": 324.0,
    "width": 141.0,
    "thickness": 55.0,
    "powerConnector": "3×8-pin",
    "score": 108,
    "specs": [
      "16 ГБ · 300 Вт",
      "324 мм · 3×8-pin",
      "Толщина 55 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-6900-XT-GAMING-X-TRIO-16G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-7900-xt-gaming-trio-classic-20g",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 7900 XT GAMING TRIO CLASSIC 20G",
    "price": 74900,
    "chipBrand": "AMD",
    "vram": 20,
    "power": 315,
    "recommendedPsu": 750,
    "length": 325.0,
    "width": 141.0,
    "thickness": 56.0,
    "powerConnector": "3×8-pin",
    "score": 133,
    "specs": [
      "20 ГБ · 315 Вт",
      "325 мм · 3×8-pin",
      "Толщина 56 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-7900-XT-GAMING-TRIO-CLASSIC-20G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-radeon-rx-7900-xtx-gaming-trio-classic-24g",
    "category": "gpu",
    "brand": "MSI",
    "name": "Radeon RX 7900 XTX GAMING TRIO CLASSIC 24G",
    "price": 94900,
    "chipBrand": "AMD",
    "vram": 24,
    "power": 355,
    "recommendedPsu": 800,
    "length": 325.0,
    "width": 141.0,
    "thickness": 56.0,
    "powerConnector": "3×8-pin",
    "score": 156,
    "specs": [
      "24 ГБ · 355 Вт",
      "325 мм · 3×8-pin",
      "Толщина 56 мм"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/Radeon-RX-7900-XTX-GAMING-TRIO-CLASSIC-24G/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-intel-arc-b580-limited-edition",
    "category": "gpu",
    "brand": "Intel",
    "name": "Arc B580 Limited Edition",
    "price": 29900,
    "vram": 12,
    "power": 190,
    "recommendedPsu": 600,
    "length": 272,
    "width": 115,
    "slots": 2,
    "powerConnector": "8-pin",
    "score": 62,
    "specs": [
      "12 ГБ GDDR6 · 190 Вт",
      "272 мм · 2 слота",
      "PCIe 4.0 ×8"
    ],
    "note": "Для корректной производительности Intel Arc важна поддержка Resizable BAR. Её включение в BIOS симулятор не моделирует.",
    "sourceUrl": "https://www.intel.com/content/www/us/en/products/sku/241598/intel-arc-b580-graphics/specifications.html",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-wd-black-sn850x-1",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 1 ТБ",
    "price": 9900,
    "capacity": 1000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6300,
    "power": 8,
    "heatsink": false,
    "specs": [
      "1 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6300 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS100T2X0E-00BCA0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-1-heatsink",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 1 ТБ Heatsink",
    "price": 11500,
    "capacity": 1000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6300,
    "power": 8,
    "heatsink": true,
    "specs": [
      "1 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6300 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "sku": "WDS100T2XHE-00BCA0",
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-2",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 2 ТБ",
    "price": 15900,
    "capacity": 2000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6600,
    "power": 8,
    "heatsink": false,
    "specs": [
      "2 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6600 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS200T2X0E-00BCA0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-2-heatsink",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 2 ТБ Heatsink",
    "price": 17500,
    "capacity": 2000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6600,
    "power": 8,
    "heatsink": true,
    "specs": [
      "2 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6600 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "sku": "WDS200T2XHE-00BCA0",
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-4",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 4 ТБ",
    "price": 28900,
    "capacity": 4000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6600,
    "power": 8,
    "heatsink": false,
    "specs": [
      "4 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6600 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS400T2X0E-00BCA0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-4-heatsink",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 4 ТБ Heatsink",
    "price": 30500,
    "capacity": 4000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6600,
    "power": 8,
    "heatsink": true,
    "specs": [
      "4 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6600 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "sku": "WDS400T2XHE-00BCA0",
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-8",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 8 ТБ",
    "price": 59900,
    "capacity": 8000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7200,
    "writeSpeed": 6600,
    "power": 8,
    "heatsink": false,
    "specs": [
      "8 ТБ · PCIe 4.0 ×4",
      "До 7200 / 6600 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS800T2X0E-00CDD0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-black-sn850x-8-heatsink",
    "category": "storage",
    "brand": "WD_BLACK",
    "name": "SN850X 8 ТБ Heatsink",
    "price": 61500,
    "capacity": 8000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7200,
    "writeSpeed": 6600,
    "power": 8,
    "heatsink": true,
    "specs": [
      "8 ТБ · PCIe 4.0 ×4",
      "До 7200 / 6600 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "sku": "WDS800T2XHE-00CDD0",
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-blue-sn5000-500",
    "category": "storage",
    "brand": "WD Blue",
    "name": "SN5000 500 ГБ",
    "price": 3900,
    "capacity": 500,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 5000,
    "writeSpeed": 4000,
    "power": 8,
    "heatsink": false,
    "specs": [
      "500 ГБ · PCIe 4.0 ×4",
      "До 5000 / 4000 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS500G4B0E-00CNZ0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-blue-sn5000-1",
    "category": "storage",
    "brand": "WD Blue",
    "name": "SN5000 1 ТБ",
    "price": 6900,
    "capacity": 1000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 5150,
    "writeSpeed": 4900,
    "power": 8,
    "heatsink": false,
    "specs": [
      "1 ТБ · PCIe 4.0 ×4",
      "До 5150 / 4900 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS100T4B0E-00CNZ0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-blue-sn5000-2",
    "category": "storage",
    "brand": "WD Blue",
    "name": "SN5000 2 ТБ",
    "price": 11900,
    "capacity": 2000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 5150,
    "writeSpeed": 4850,
    "power": 8,
    "heatsink": false,
    "specs": [
      "2 ТБ · PCIe 4.0 ×4",
      "До 5150 / 4850 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS200T4B0E-00CNZ0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-blue-sn5000-4",
    "category": "storage",
    "brand": "WD Blue",
    "name": "SN5000 4 ТБ",
    "price": 22900,
    "capacity": 4000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 5500,
    "writeSpeed": 5000,
    "power": 8,
    "heatsink": false,
    "specs": [
      "4 ТБ · PCIe 4.0 ×4",
      "До 5500 / 5000 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS400T4B0E-00BKY0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-green-sn350-250",
    "category": "storage",
    "brand": "WD Green",
    "name": "SN350 250 ГБ",
    "price": 2500,
    "capacity": 250,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 3,
    "readSpeed": 2400,
    "writeSpeed": 1500,
    "power": 8,
    "heatsink": false,
    "specs": [
      "250 ГБ · PCIe 3.0 ×4",
      "До 2400 / 1500 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS250G2G0C-00CDH0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-green-sn350-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-green-sn350-500",
    "category": "storage",
    "brand": "WD Green",
    "name": "SN350 500 ГБ",
    "price": 3500,
    "capacity": 500,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 3,
    "readSpeed": 2400,
    "writeSpeed": 1500,
    "power": 8,
    "heatsink": false,
    "specs": [
      "500 ГБ · PCIe 3.0 ×4",
      "До 2400 / 1500 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS500G2G0C-00CDH0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-green-sn350-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-wd-green-sn350-2",
    "category": "storage",
    "brand": "WD Green",
    "name": "SN350 2 ТБ",
    "price": 9900,
    "capacity": 2000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 3,
    "readSpeed": 3200,
    "writeSpeed": 3200,
    "power": 8,
    "heatsink": false,
    "specs": [
      "2 ТБ · PCIe 3.0 ×4",
      "До 3200 / 3200 МБ/с",
      "M.2 2280"
    ],
    "sku": "WDS200T3G0C-00AZL0",
    "sourceUrl": "https://www.sandisk.com/products/ssd/internal-ssd/wd-green-sn350-nvme-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-samsung-990-pro-1",
    "category": "storage",
    "brand": "Samsung",
    "name": "990 PRO 1 ТБ",
    "price": 10900,
    "capacity": 1000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7450,
    "writeSpeed": 6900,
    "power": 8,
    "heatsink": false,
    "specs": [
      "1 ТБ · PCIe 4.0 ×4",
      "До 7450 / 6900 МБ/с",
      "M.2 2280"
    ],
    "sku": "MZ-V9P1T0BW",
    "sourceUrl": "https://www.samsung.com/uk/memory-storage/nvme-ssd/990-pro-1tb-nvme-pcie-gen-4-mz-v9p1t0bw/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-samsung-990-pro-2",
    "category": "storage",
    "brand": "Samsung",
    "name": "990 PRO 2 ТБ",
    "price": 17900,
    "capacity": 2000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7450,
    "writeSpeed": 6900,
    "power": 8,
    "heatsink": false,
    "specs": [
      "2 ТБ · PCIe 4.0 ×4",
      "До 7450 / 6900 МБ/с",
      "M.2 2280"
    ],
    "sku": "MZ-V9P2T0BW",
    "sourceUrl": "https://www.samsung.com/uk/memory-storage/nvme-ssd/990-pro-2tb-nvme-pcie-gen-4-mz-v9p2t0bw/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-samsung-990-pro-4",
    "category": "storage",
    "brand": "Samsung",
    "name": "990 PRO 4 ТБ",
    "price": 32900,
    "capacity": 4000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7450,
    "writeSpeed": 6900,
    "power": 8,
    "heatsink": false,
    "specs": [
      "4 ТБ · PCIe 4.0 ×4",
      "До 7450 / 6900 МБ/с",
      "M.2 2280"
    ],
    "sku": "MZ-V9P4T0BW",
    "sourceUrl": "https://www.samsung.com/uk/memory-storage/nvme-ssd/990-pro-4tb-nvme-pcie-gen-4-mz-v9p4t0bw/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-kingston-fury-renegade-1-heatsink",
    "category": "storage",
    "brand": "Kingston",
    "name": "FURY Renegade 1 ТБ Heatsink",
    "price": 10900,
    "capacity": 1000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 6000,
    "power": 6.3,
    "heatsink": true,
    "specs": [
      "1 ТБ · PCIe 4.0 ×4",
      "До 7300 / 6000 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.kingston.com/en/ssd/gaming/kingston-fury-renegade-nvme-m2-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-kingston-fury-renegade-2-heatsink",
    "category": "storage",
    "brand": "Kingston",
    "name": "FURY Renegade 2 ТБ Heatsink",
    "price": 17900,
    "capacity": 2000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 7000,
    "power": 9.9,
    "heatsink": true,
    "specs": [
      "2 ТБ · PCIe 4.0 ×4",
      "До 7300 / 7000 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.kingston.com/en/ssd/gaming/kingston-fury-renegade-nvme-m2-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-kingston-fury-renegade-4-heatsink",
    "category": "storage",
    "brand": "Kingston",
    "name": "FURY Renegade 4 ТБ Heatsink",
    "price": 32900,
    "capacity": 4000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 7300,
    "writeSpeed": 7000,
    "power": 10.2,
    "heatsink": true,
    "specs": [
      "4 ТБ · PCIe 4.0 ×4",
      "До 7300 / 7000 МБ/с",
      "M.2 2280 · с радиатором"
    ],
    "note": "Версия с собственным радиатором. Совместное использование с кожухом M.2 материнской платы требует проверки.",
    "sourceUrl": "https://www.kingston.com/en/ssd/gaming/kingston-fury-renegade-nvme-m2-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-kingston-nv3-4",
    "category": "storage",
    "brand": "Kingston",
    "name": "NV3 4 ТБ",
    "price": 20900,
    "capacity": 4000,
    "interface": "NVMe",
    "formFactor": "M.2 2280",
    "pcie": 4,
    "readSpeed": 6000,
    "writeSpeed": 5000,
    "power": 8,
    "heatsink": false,
    "specs": [
      "4 ТБ · PCIe 4.0 ×4",
      "До 6000 / 5000 МБ/с",
      "M.2 2280"
    ],
    "sku": "SNV3S/4000G",
    "sourceUrl": "https://www.kingston.com/en/ssd/nv3-nvme-pcie-ssd",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-variant-table"
  },
  {
    "id": "extra-deepcool-ak400",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "AK400",
    "price": 2600,
    "kind": "air",
    "height": 155,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 165,
    "specs": [
      "Воздушное охлаждение",
      "Высота 155 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/AK400-Performance-CPU-Cooler-1851-1700-AM5/2024/15222.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ak500",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "AK500",
    "price": 4900,
    "kind": "air",
    "height": 158,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 215,
    "specs": [
      "Воздушное охлаждение",
      "Высота 158 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/AK500-High-Performance-CPU-Cooler-1851-1700-AM5/2022/16040.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-assassin-iv",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "ASSASSIN IV",
    "price": 10900,
    "kind": "air",
    "height": 164,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 250,
    "specs": [
      "Воздушное охлаждение",
      "Высота 164 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/Assassin-IV-Premium-CPU-Air-Cooler-1851-1700-AM5/2024/17129.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-assassin-4s",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "ASSASSIN 4S",
    "price": 9900,
    "kind": "air",
    "height": 164,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 235,
    "specs": [
      "Воздушное охлаждение",
      "Высота 164 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/Assassin-4S-Minimalistic-Premium-CPU-Air-Cooler-1851-1700-AM5/2023/17881.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-an600",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "AN600",
    "price": 4900,
    "kind": "air",
    "height": 67,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 110,
    "specs": [
      "Воздушное охлаждение",
      "Высота 67 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "lowProfile": true,
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/AN600-Top-Flow-Low-Profile-Cooler-1851-1700-AM5/2023/16837.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ag400",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "AG400",
    "price": 2100,
    "kind": "air",
    "height": 150,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 150,
    "specs": [
      "Воздушное охлаждение",
      "Высота 150 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/GAMMAXX-AG400-Single-Tower-CPU-Cooler-1851-1700-AM5/2024/15898.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ag620",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "AG620",
    "price": 4500,
    "kind": "air",
    "height": 157,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 220,
    "specs": [
      "Воздушное охлаждение",
      "Высота 157 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/GAMMAXX-AG620-Dual-Tower-CPU-Cooler-1851-1700-AM5/2024/15900.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-as500-plus",
    "category": "cooler",
    "brand": "DeepCool",
    "name": "AS500 PLUS",
    "price": 6500,
    "kind": "air",
    "height": 164,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 220,
    "specs": [
      "Воздушное охлаждение",
      "Высота 164 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cooling/cpuaircoolers/AS500-PLUS-Dual-Fan-CPU-Cooler/2021/11415.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-u12a",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-U12A",
    "price": 12900,
    "kind": "air",
    "height": 158,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 220,
    "specs": [
      "Воздушное охлаждение",
      "Высота 158 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.noctua.at/en/products/nh-u12a/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-u12s",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-U12S",
    "price": 8500,
    "kind": "air",
    "height": 158,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 175,
    "specs": [
      "Воздушное охлаждение",
      "Высота 158 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.noctua.at/en/products/nh-u12s/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-u12s-redux",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-U12S redux",
    "price": 5500,
    "kind": "air",
    "height": 158,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 160,
    "specs": [
      "Воздушное охлаждение",
      "Высота 158 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.noctua.at/en/products/nh-u12s-redux/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-d15s",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-D15S",
    "price": 10900,
    "kind": "air",
    "height": 160,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 220,
    "specs": [
      "Воздушное охлаждение",
      "Высота 160 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.noctua.at/en/products/nh-d15s/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-l9a-am4",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-L9a-AM4",
    "price": 4900,
    "kind": "air",
    "height": 37,
    "sockets": [
      "AM4"
    ],
    "coolingCapacity": 70,
    "specs": [
      "Воздушное охлаждение",
      "Высота 37 мм",
      "AM4"
    ],
    "lowProfile": true,
    "note": "Эта версия привязана к указанным сокетам. Для других платформ существуют отдельные модели с другими креплениями.",
    "sourceUrl": "https://www.noctua.at/en/products/nh-l9a-am4/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-l9i",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-L9i",
    "price": 4900,
    "kind": "air",
    "height": 37,
    "sockets": [
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156",
      "LGA1200"
    ],
    "coolingCapacity": 65,
    "specs": [
      "Воздушное охлаждение",
      "Высота 37 мм",
      "LGA1151 / LGA1150 / LGA1155"
    ],
    "lowProfile": true,
    "note": "Эта версия привязана к указанным сокетам. Для других платформ существуют отдельные модели с другими креплениями.",
    "sourceUrl": "https://www.noctua.at/en/products/nh-l9i/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-noctua-nh-l12s",
    "category": "cooler",
    "brand": "Noctua",
    "name": "NH-L12S",
    "price": 6900,
    "kind": "air",
    "height": 86,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 110,
    "specs": [
      "Воздушное охлаждение",
      "Высота 86 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "lowProfile": true,
    "note": "Низкое положение вентилятора:70 мм; верхнее:86 мм. В расчёте выбран консервативный высокий режим, учитывай зазор RAM.",
    "sourceUrl": "https://www.noctua.at/en/products/nh-l12s/specifications",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-thermalright-phantom-spirit-120-se",
    "category": "cooler",
    "brand": "Thermalright",
    "name": "Phantom Spirit 120 SE",
    "price": 4900,
    "kind": "air",
    "height": 154,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 235,
    "specs": [
      "Воздушное охлаждение",
      "Высота 154 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.thermalright.com/product/phantom-spirit-120-se/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-thermalright-frost-spirit-140",
    "category": "cooler",
    "brand": "Thermalright",
    "name": "Frost Spirit 140",
    "price": 5900,
    "kind": "air",
    "height": 158,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 235,
    "specs": [
      "Воздушное охлаждение",
      "Высота 158 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.thermalright.com/product/frost-spirit-140/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-thermalright-silver-soul-135",
    "category": "cooler",
    "brand": "Thermalright",
    "name": "Silver Soul 135",
    "price": 4900,
    "kind": "air",
    "height": 135,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 180,
    "specs": [
      "Воздушное охлаждение",
      "Высота 135 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "sourceUrl": "https://www.thermalright.com/product/silver-soul-135/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-thermalright-axp120-x67",
    "category": "cooler",
    "brand": "Thermalright",
    "name": "AXP120-X67",
    "price": 3900,
    "kind": "air",
    "height": 67,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851",
      "LGA1200",
      "LGA1151",
      "LGA1150",
      "LGA1155",
      "LGA1156"
    ],
    "coolingCapacity": 110,
    "specs": [
      "Воздушное охлаждение",
      "Высота 67 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "lowProfile": true,
    "sourceUrl": "https://www.thermalright.com/product/axp120-x67/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-arctic-liquid-freezer-iii-280",
    "category": "cooler",
    "brand": "ARCTIC",
    "name": "Liquid Freezer III 280",
    "price": 10900,
    "kind": "aio",
    "radiator": 280,
    "radiatorThickness": 38,
    "fanThickness": 27,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851"
    ],
    "coolingCapacity": 265,
    "specs": [
      "СЖО · 280 мм",
      "Радиатор38 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "note": "Кроме длины радиатора проверь суммарную толщину радиатора с вентиляторами и расположение VRM/RAM.",
    "sourceUrl": "https://www.arctic.de/en/Liquid-Freezer-III-280/ACFRE00135A",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-arctic-liquid-freezer-iii-420",
    "category": "cooler",
    "brand": "ARCTIC",
    "name": "Liquid Freezer III 420",
    "price": 15900,
    "kind": "aio",
    "radiator": 420,
    "radiatorThickness": 38,
    "fanThickness": 27,
    "sockets": [
      "AM4",
      "AM5",
      "LGA1700",
      "LGA1851"
    ],
    "coolingCapacity": 325,
    "specs": [
      "СЖО · 420 мм",
      "Радиатор38 мм",
      "AM4 / AM5 / LGA1700"
    ],
    "note": "Кроме длины радиатора проверь суммарную толщину радиатора с вентиляторами и расположение VRM/RAM.",
    "sourceUrl": "https://www.arctic.de/en/Liquid-Freezer-III-420/ACFRE00137A",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mag-a550bn",
    "category": "psu",
    "brand": "MSI",
    "name": "MAG A550BN",
    "price": 4900,
    "watts": 550,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Bronze",
    "modular": false,
    "connectors": {
      "pcie8": 2,
      "eps8": 1,
      "native12VHPWR": false
    },
    "specs": [
      "550 Вт · 80 PLUS Bronze",
      "ATX · 140 мм",
      "Фиксированные кабели"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MAG-A550BN/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mag-a650gl",
    "category": "psu",
    "brand": "MSI",
    "name": "MAG A650GL",
    "price": 8000,
    "watts": 650,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "connectors": {
      "pcie8": 4,
      "eps8": 2,
      "native12VHPWR": false
    },
    "specs": [
      "650 Вт · 80 PLUS Gold",
      "ATX · 140 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MAG-A650GL/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mag-a1000gl-pcie5",
    "category": "psu",
    "brand": "MSI",
    "name": "MAG A1000GL PCIE5",
    "price": 11500,
    "watts": 1000,
    "length": 150,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "connectors": {
      "pcie8": 4,
      "eps8": 2,
      "native12VHPWR": true
    },
    "specs": [
      "1000 Вт · 80 PLUS Gold",
      "ATX · 150 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MAG-A1000GL-PCIE5/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mpg-a750gf",
    "category": "psu",
    "brand": "MSI",
    "name": "MPG A750GF",
    "price": 9000,
    "watts": 750,
    "length": 160,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "connectors": {
      "pcie8": 6,
      "eps8": 2,
      "native12VHPWR": false
    },
    "specs": [
      "750 Вт · 80 PLUS Gold",
      "ATX · 160 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MPG-A750GF/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mpg-a850gf",
    "category": "psu",
    "brand": "MSI",
    "name": "MPG A850GF",
    "price": 10000,
    "watts": 850,
    "length": 160,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "connectors": {
      "pcie8": 6,
      "eps8": 2,
      "native12VHPWR": false
    },
    "specs": [
      "850 Вт · 80 PLUS Gold",
      "ATX · 160 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MPG-A850GF/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mpg-a850g-pcie5",
    "category": "psu",
    "brand": "MSI",
    "name": "MPG A850G PCIE5",
    "price": 10000,
    "watts": 850,
    "length": 150,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "connectors": {
      "pcie8": 6,
      "eps8": 2,
      "native12VHPWR": true
    },
    "specs": [
      "850 Вт · 80 PLUS Gold",
      "ATX · 150 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MPG-A850G-PCIE5/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-mpg-a1000g-pcie5",
    "category": "psu",
    "brand": "MSI",
    "name": "MPG A1000G PCIE5",
    "price": 11500,
    "watts": 1000,
    "length": 150,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "connectors": {
      "pcie8": 6,
      "eps8": 2,
      "native12VHPWR": true
    },
    "specs": [
      "1000 Вт · 80 PLUS Gold",
      "ATX · 150 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MPG-A1000G-PCIE5/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-meg-ai1300p-pcie5",
    "category": "psu",
    "brand": "MSI",
    "name": "MEG Ai1300P PCIE5",
    "price": 18000,
    "watts": 1300,
    "length": 160,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "connectors": {
      "pcie8": 8,
      "eps8": 2,
      "native12VHPWR": true
    },
    "specs": [
      "1300 Вт · 80 PLUS Platinum",
      "ATX · 160 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MEG-Ai1300P-PCIE5/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-msi-meg-ai1000p-pcie5",
    "category": "psu",
    "brand": "MSI",
    "name": "MEG Ai1000P PCIE5",
    "price": 15000,
    "watts": 1000,
    "length": 160,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "connectors": {
      "pcie8": 8,
      "eps8": 2,
      "native12VHPWR": true
    },
    "specs": [
      "1000 Вт · 80 PLUS Platinum",
      "ATX · 160 мм",
      "Модульный"
    ],
    "sourceUrl": "https://www.msi.com/Power-Supply/MEG-Ai1000P-PCIE5/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-seasonic-focus-gx-550-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS GX-550 (2019)",
    "price": 9000,
    "watts": 550,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "specs": [
      "550 Вт · 80 PLUS Gold",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-gx/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-gx-650-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS GX-650 (2019)",
    "price": 10000,
    "watts": 650,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "specs": [
      "650 Вт · 80 PLUS Gold",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-gx/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-gx-750-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS GX-750 (2019)",
    "price": 11000,
    "watts": 750,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "specs": [
      "750 Вт · 80 PLUS Gold",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-gx/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-gx-850-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS GX-850 (2019)",
    "price": 12000,
    "watts": 850,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "specs": [
      "850 Вт · 80 PLUS Gold",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-gx/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-gx-1000-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS GX-1000 (2019)",
    "price": 13500,
    "watts": 1000,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "specs": [
      "1000 Вт · 80 PLUS Gold",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-gx/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-px-550-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS PX-550 (2019)",
    "price": 11000,
    "watts": 550,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "specs": [
      "550 Вт · 80 PLUS Platinum",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-px/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-px-650-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS PX-650 (2019)",
    "price": 12000,
    "watts": 650,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "specs": [
      "650 Вт · 80 PLUS Platinum",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-px/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-px-750-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS PX-750 (2019)",
    "price": 13000,
    "watts": 750,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "specs": [
      "750 Вт · 80 PLUS Platinum",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-px/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-seasonic-focus-px-850-2019",
    "category": "psu",
    "brand": "Seasonic",
    "name": "FOCUS PX-850 (2019)",
    "price": 14000,
    "watts": 850,
    "length": 140,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "specs": [
      "850 Вт · 80 PLUS Platinum",
      "ATX · 140 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальная серия FOCUS 2019, не одноимённая ATX3.x. Комплект кабелей зависит от ревизии; точное число разъёмов не утверждается.",
    "sourceUrl": "https://seasonic.com/focus-px/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-family-specification-partial"
  },
  {
    "id": "extra-corsair-sf750-platinum-2018",
    "category": "psu",
    "brand": "Corsair",
    "name": "SF750 Platinum (2018)",
    "price": 17900,
    "watts": 750,
    "length": 100,
    "formFactor": "SFX",
    "efficiency": "80 PLUS Platinum",
    "modular": true,
    "specs": [
      "750 Вт · 80 PLUS Platinum",
      "SFX · 100 мм",
      "Для компактных корпусов"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Оригинальный SF750 Platinum, не версия2024. Проверь комплект кабелей; для ATX-корпуса может требоваться рамка.",
    "sourceUrl": "https://www.corsair.com/us/en/p/psu/cp-9020186-na/sf-series-sf750-750-watt-80-plus-platinum-certified-high-performance-sfx-psu-cp-9020186-na",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification-partial"
  },
  {
    "id": "extra-corsair-rm650x-2021",
    "category": "psu",
    "brand": "Corsair",
    "name": "RM650x (2021)",
    "price": 9900,
    "watts": 650,
    "length": 160,
    "formFactor": "ATX",
    "efficiency": "80 PLUS Gold",
    "modular": true,
    "specs": [
      "650 Вт · 80 PLUS Gold",
      "ATX · 160 мм",
      "Полностью модульный"
    ],
    "unknownSpecs": [
      "connectors"
    ],
    "note": "Версия2021. Точное число кабелей проверь по комплектации ревизии.",
    "sourceUrl": "https://www.corsair.com/us/en/p/psu/cp-9020198-na/rmx-series-rm650x-650-watt-80-plus-gold-fully-modular-atx-psu-cp-9020198-na",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification-partial"
  },
  {
    "id": "extra-deepcool-ch160",
    "category": "case",
    "brand": "DeepCool",
    "name": "CH160",
    "price": 5900,
    "supportedFormFactors": [
      "Mini-ITX"
    ],
    "maxGpuLength": 305,
    "maxCoolerHeight": 172,
    "supportedPsuFormFactors": [
      "ATX",
      "SFX",
      "SFX-L"
    ],
    "specs": [
      "Mini-ITX",
      "GPU до 305 мм",
      "Кулер до 172 мм"
    ],
    "note": "С ATX БП длина GPU ограничена230 мм; с SFX/SFX-L —305 мм. Радиаторы СЖО не поддерживаются.",
    "maxPsuLength": 140,
    "radiatorSupport": [],
    "maxGpuLengthWithAtxPsu": 230,
    "sourceUrl": "https://www.deepcool.com/products/Cases/CH160-Portable-High-Airflow-M-ITX-Case/2024/18115.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ch370",
    "category": "case",
    "brand": "DeepCool",
    "name": "CH370",
    "price": 5900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 378,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 378 мм",
      "Кулер до 165 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 160,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "frontRadiatorOnly": [
      280,
      360
    ],
    "maxGpuLengthWithFrontRadiator": 320,
    "sourceUrl": "https://www.deepcool.com/products/Cases/CH370-Micro-ATX-Case/2022/15949.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ch360",
    "category": "case",
    "brand": "DeepCool",
    "name": "CH360",
    "price": 6900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 378,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 378 мм",
      "Кулер до 165 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 160,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "frontRadiatorOnly": [
      280,
      360
    ],
    "maxGpuLengthWithFrontRadiator": 320,
    "sourceUrl": "https://www.deepcool.com/products/Cases/CH360-New-Generation-of-Airflow-M-ATX-Case/2023/17713.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ch560",
    "category": "case",
    "brand": "DeepCool",
    "name": "CH560",
    "price": 8900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 380,
    "maxCoolerHeight": 175,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 380 мм",
      "Кулер до 175 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 170,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cases/CH560-New-Generation-of-Airflow-Case/2023/17101.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ch510",
    "category": "case",
    "brand": "DeepCool",
    "name": "CH510",
    "price": 5900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 380,
    "maxCoolerHeight": 175,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 380 мм",
      "Кулер до 175 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 170,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cases/CH510-Mid-Tower-ATX-Case/2022/15764.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-cc560-v2",
    "category": "case",
    "brand": "DeepCool",
    "name": "CC560 V2",
    "price": 4900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 370,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 370 мм",
      "Кулер до 165 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 170,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cases/CC560-V2-Mid-Tower-Airflow-Case/2023/17782.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-cg560",
    "category": "case",
    "brand": "DeepCool",
    "name": "CG560",
    "price": 6900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 380,
    "maxCoolerHeight": 175,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 380 мм",
      "Кулер до 175 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 170,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "frontRadiatorOnly": [
      360
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cases/CG560-Airflow-Mid-Tower-ATX-Case/2021/13520.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-macube-110",
    "category": "case",
    "brand": "DeepCool",
    "name": "MACUBE 110",
    "price": 4900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 378,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 378 мм",
      "Кулер до 165 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 160,
    "radiatorSupport": [
      120,
      140,
      240,
      280
    ],
    "maxGpuLengthWithFrontRadiator": 320,
    "sourceUrl": "https://www.deepcool.com/products/Cases/Macube-110-Micro-ATX-Case/2021/4670.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-matrexx-40",
    "category": "case",
    "brand": "DeepCool",
    "name": "MATREXX 40",
    "price": 3900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 320,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 320 мм",
      "Кулер до 165 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 160,
    "radiatorSupport": [
      120,
      140,
      240,
      280
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cases/Matrexx-40-Airflow-Micro-ATX-Case/2021/11876.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-deepcool-ch780",
    "category": "case",
    "brand": "DeepCool",
    "name": "CH780",
    "price": 17900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 480,
    "maxCoolerHeight": 132,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 480 мм",
      "Кулер до 132 мм"
    ],
    "note": "Корпус с вертикальным креплением GPU и комплектным PCIe4.0 райзером; воздушный кулер ограничен132 мм.",
    "maxPsuLength": 180,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360,
      420
    ],
    "sourceUrl": "https://www.deepcool.com/products/Cases/CH780-Panoramic-Tempered-Glass-ATX-Case/2023/17534.shtml",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-meshify-2",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Meshify 2",
    "price": 18900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 470,
    "maxCoolerHeight": 185,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 470 мм",
      "Кулер до 185 мм"
    ],
    "note": "Максимальная длина GPU470 мм относится к открытой компоновке. Корзины дисков, вентиляторы и радиатор уменьшают её.",
    "maxPsuLength": 250,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360,
      420
    ],
    "sourceUrl": "https://www.fractal-design.com/products/cases/meshify-series/meshify-2/meshify-2-black-light-tg/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-meshify-2-compact",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Meshify 2 Compact",
    "price": 13900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 341,
    "maxCoolerHeight": 169,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 341 мм",
      "Кулер до 169 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 200,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://www.fractal-design.com/products/cases/meshify-series/meshify-2-compact/meshify-2-compact-black-dark-tg/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-define-7",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Define 7",
    "price": 19900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 470,
    "maxCoolerHeight": 185,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 470 мм",
      "Кулер до 185 мм"
    ],
    "note": "Максимальная длина GPU470 мм относится к открытой компоновке. Корзины дисков, вентиляторы и радиатор уменьшают её.",
    "maxPsuLength": 250,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360,
      420
    ],
    "sourceUrl": "https://www.fractal-design.com/products/cases/define-series/define-7/black/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-define-7-compact",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Define 7 Compact",
    "price": 13900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 341,
    "maxCoolerHeight": 169,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 341 мм",
      "Кулер до 169 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 200,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://www.fractal-design.com/products/cases/define-series/define-7-compact/define-7-compact-black-solid/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-node-304",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Node 304",
    "price": 10900,
    "supportedFormFactors": [
      "Mini-ITX"
    ],
    "maxGpuLength": 310,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "Mini-ITX",
      "GPU до 310 мм",
      "Кулер до 165 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "unknownSpecs": [
      "maxPsuLength",
      "radiatorSupport"
    ],
    "maxGpuThickness": 45,
    "sourceUrl": "https://www.fractal-design.com/products/cases/node-series/node-304/node-304-black/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification-partial"
  },
  {
    "id": "extra-fractal-design-node-804",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Node 804",
    "price": 14900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 320,
    "maxCoolerHeight": 160,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 320 мм",
      "Кулер до 160 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 260,
    "radiatorSupport": [
      120,
      240
    ],
    "sourceUrl": "https://www.fractal-design.com/products/cases/node-series/node-804/node-804/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-torrent-rgb",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Torrent RGB",
    "price": 23900,
    "supportedFormFactors": [
      "E-ATX",
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 461,
    "maxCoolerHeight": 188,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "E-ATX / ATX / mATX / Mini-ITX",
      "GPU до 461 мм",
      "Кулер до 188 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 230,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360,
      420
    ],
    "sourceUrl": "https://www.fractal-design.com/products/cases/torrent-series/torrent/torrent-rgb-black-tg-light-tint/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-fractal-design-terra-jade",
    "category": "case",
    "brand": "Fractal Design",
    "name": "Terra Jade",
    "price": 19900,
    "supportedFormFactors": [
      "Mini-ITX"
    ],
    "maxGpuLength": 322,
    "maxCoolerHeight": 48,
    "supportedPsuFormFactors": [
      "SFX",
      "SFX-L"
    ],
    "specs": [
      "Mini-ITX",
      "GPU до 322 мм",
      "Кулер до 48 мм"
    ],
    "note": "Положение центральной рамы связывает толщину GPU с высотой CPU-кулера. Взята консервативная высота48 мм; максимумы нельзя считать независимыми.",
    "maxPsuLength": 130,
    "radiatorSupport": [
      120
    ],
    "maxGpuThickness": 72,
    "sourceUrl": "https://www.fractal-design.com/products/cases/terra-series/terra/terra-jade/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-cooler-master-masterbox-nr200",
    "category": "case",
    "brand": "Cooler Master",
    "name": "MasterBox NR200",
    "price": 8900,
    "supportedFormFactors": [
      "Mini-ITX"
    ],
    "maxGpuLength": 330,
    "maxCoolerHeight": 155,
    "supportedPsuFormFactors": [
      "SFX",
      "SFX-L"
    ],
    "specs": [
      "Mini-ITX",
      "GPU до 330 мм",
      "Кулер до 155 мм"
    ],
    "note": "Установка GPU горизонтальная. При вертикальной GPU высота кулера76 мм, боковая СЖО недоступна. NR200P:153 мм со стеклом,155 мм с сеткой.",
    "maxPsuLength": 130,
    "radiatorSupport": [
      120,
      140,
      240,
      280
    ],
    "maxGpuThickness": 60,
    "sourceUrl": "https://www.coolermaster.com/en-global/products/masterbox-nr200.html",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-cooler-master-masterbox-nr200p",
    "category": "case",
    "brand": "Cooler Master",
    "name": "MasterBox NR200P",
    "price": 11900,
    "supportedFormFactors": [
      "Mini-ITX"
    ],
    "maxGpuLength": 330,
    "maxCoolerHeight": 153,
    "supportedPsuFormFactors": [
      "SFX",
      "SFX-L"
    ],
    "specs": [
      "Mini-ITX",
      "GPU до 330 мм",
      "Кулер до 153 мм"
    ],
    "note": "Установка GPU горизонтальная. При вертикальной GPU высота кулера76 мм, боковая СЖО недоступна. NR200P:153 мм со стеклом,155 мм с сеткой.",
    "maxPsuLength": 130,
    "radiatorSupport": [
      120,
      140,
      240,
      280
    ],
    "maxGpuThickness": 60,
    "sourceUrl": "https://www.coolermaster.com/en-global/products/masterbox-nr200p.html",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-cooler-master-masterbox-td500-mesh-v2",
    "category": "case",
    "brand": "Cooler Master",
    "name": "MasterBox TD500 Mesh V2",
    "price": 11900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 410,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 410 мм",
      "Кулер до 165 мм"
    ],
    "note": "Верхний радиатор с вентиляторами рекомендован толщиной до55 мм; БП до200 мм, рекомендовано до170 мм.",
    "maxPsuLength": 200,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://www.coolermaster.com/en-global/products/masterbox-td500-mesh-v2.html",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-cooler-master-masterbox-q300l",
    "category": "case",
    "brand": "Cooler Master",
    "name": "MasterBox Q300L",
    "price": 4900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 360,
    "maxCoolerHeight": 159,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 360 мм",
      "Кулер до 159 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 160,
    "radiatorSupport": [
      120,
      240
    ],
    "sourceUrl": "https://www.coolermaster.com/en-global/products/masterbox-q300l.html",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-lian-li-o11-dynamic-evo",
    "category": "case",
    "brand": "Lian Li",
    "name": "O11 Dynamic EVO",
    "price": 19900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 426,
    "maxCoolerHeight": 167,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 426 мм",
      "Кулер до 167 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 220,
    "radiatorSupport": [
      120,
      140,
      240,
      280,
      360
    ],
    "sourceUrl": "https://lian-li.com/product/o11-dynamic-evo/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-lian-li-o11-vision",
    "category": "case",
    "brand": "Lian Li",
    "name": "O11 Vision",
    "price": 18900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 430,
    "maxCoolerHeight": 174,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 430 мм",
      "Кулер до 174 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 232,
    "radiatorSupport": [
      120,
      240,
      280,
      360
    ],
    "sourceUrl": "https://lian-li.com/product/o11-vision/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-lian-li-lancool-iii",
    "category": "case",
    "brand": "Lian Li",
    "name": "LANCOOL III",
    "price": 17900,
    "supportedFormFactors": [
      "ATX",
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 435,
    "maxCoolerHeight": 187,
    "supportedPsuFormFactors": [
      "ATX"
    ],
    "specs": [
      "ATX / mATX / Mini-ITX",
      "GPU до 435 мм",
      "Кулер до 187 мм"
    ],
    "note": "Предельные габариты зависят от компоновки, положения вентиляторов, радиаторов и дисковых корзин. Проверь руководство выбранного корпуса.",
    "maxPsuLength": 220,
    "radiatorSupport": [
      240,
      280,
      360,
      420
    ],
    "sourceUrl": "https://lian-li.com/product/lancool-iii/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-lian-li-a3-matx",
    "category": "case",
    "brand": "Lian Li",
    "name": "A3-mATX",
    "price": 8900,
    "supportedFormFactors": [
      "mATX",
      "Mini-ITX"
    ],
    "maxGpuLength": 415,
    "maxCoolerHeight": 165,
    "supportedPsuFormFactors": [
      "ATX",
      "SFX",
      "SFX-L"
    ],
    "specs": [
      "mATX / Mini-ITX",
      "GPU до 415 мм",
      "Кулер до 165 мм"
    ],
    "note": "Длина GPU, положение БП и размер радиатора взаимосвязаны. Максимум415 мм доступен не во всех компоновках.",
    "maxPsuLength": 220,
    "radiatorSupport": [
      240,
      280,
      360
    ],
    "sourceUrl": "https://lian-li.com/product/a3-matx/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification"
  },
  {
    "id": "extra-nvidia-rtx-5090-fe",
    "category": "gpu",
    "brand": "NVIDIA",
    "name": "GeForce RTX 5090 Founders Edition",
    "price": 309000,
    "vram": 32,
    "power": 575,
    "recommendedPsu": 1000,
    "length": 304,
    "width": 137,
    "powerConnector": "16-pin",
    "score": 240,
    "chipBrand": "NVIDIA",
    "memoryType": "GDDR7",
    "generation": 2025,
    "specs": [
      "32 ГБ GDDR7",
      "304 мм · 575 Вт",
      "Питание 16-pin"
    ],
    "sourceUrl": "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "slots": 2,
    "adapterPcie8": 4,
    "note": "Нужен подходящий PCIe Gen5 кабель или адаптер с 4 разъёмами PCIe8-pin; проверь комплект конкретной платы и допустимую мощность кабеля."
  },
  {
    "id": "extra-nvidia-rtx-5080-fe",
    "category": "gpu",
    "brand": "NVIDIA",
    "name": "GeForce RTX 5080 Founders Edition",
    "price": 139000,
    "vram": 16,
    "power": 360,
    "recommendedPsu": 850,
    "length": 304,
    "width": 137,
    "powerConnector": "16-pin",
    "score": 160,
    "chipBrand": "NVIDIA",
    "memoryType": "GDDR7",
    "generation": 2025,
    "specs": [
      "16 ГБ GDDR7",
      "304 мм · 360 Вт",
      "Питание 16-pin"
    ],
    "sourceUrl": "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "slots": 2,
    "adapterPcie8": 3,
    "note": "Нужен подходящий PCIe Gen5 кабель или адаптер с 3 разъёмами PCIe8-pin; проверь комплект конкретной платы и допустимую мощность кабеля."
  },
  {
    "id": "extra-nvidia-rtx-5070-fe",
    "category": "gpu",
    "brand": "NVIDIA",
    "name": "GeForce RTX 5070 Founders Edition",
    "price": 72900,
    "vram": 12,
    "power": 250,
    "recommendedPsu": 650,
    "length": 242,
    "width": 112,
    "powerConnector": "16-pin",
    "score": 104,
    "chipBrand": "NVIDIA",
    "memoryType": "GDDR7",
    "generation": 2025,
    "specs": [
      "12 ГБ GDDR7",
      "242 мм · 250 Вт",
      "Питание 16-pin"
    ],
    "sourceUrl": "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "slots": 2,
    "adapterPcie8": 2,
    "note": "Нужен подходящий PCIe Gen5 кабель или адаптер с 2 разъёмами PCIe8-pin; проверь комплект конкретной платы и допустимую мощность кабеля."
  },
  {
    "id": "extra-msi-rtx-5070-ti-ventus",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 5070 Ti 16G VENTUS 3X OC",
    "price": 99900,
    "vram": 16,
    "power": 300,
    "recommendedPsu": 750,
    "length": 303,
    "width": 121,
    "powerConnector": "16-pin",
    "score": 132,
    "chipBrand": "NVIDIA",
    "memoryType": "GDDR7",
    "generation": 2025,
    "specs": [
      "16 ГБ GDDR7",
      "303 мм · 300 Вт",
      "Питание 16-pin"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-5070-Ti-16G-VENTUS-3X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "thickness": 49,
    "adapterPcie8": 2,
    "note": "Нужен подходящий PCIe Gen5 кабель или адаптер с 2 разъёмами PCIe8-pin; проверь комплект конкретной платы и допустимую мощность кабеля."
  },
  {
    "id": "extra-msi-rtx-5060-ti-16-ventus",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 5060 Ti 16G VENTUS 2X OC PLUS",
    "price": 50900,
    "vram": 16,
    "power": 180,
    "recommendedPsu": 600,
    "length": 227,
    "width": 126,
    "powerConnector": "8-pin",
    "score": 77,
    "chipBrand": "NVIDIA",
    "memoryType": "GDDR7",
    "generation": 2025,
    "specs": [
      "16 ГБ GDDR7",
      "227 мм · 180 Вт",
      "Питание 8-pin"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-5060-Ti-16G-VENTUS-2X-OC-PLUS/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "thickness": 41
  },
  {
    "id": "extra-msi-rtx-5060-ventus",
    "category": "gpu",
    "brand": "MSI",
    "name": "GeForce RTX 5060 8G VENTUS 2X OC",
    "price": 34900,
    "vram": 8,
    "power": 145,
    "recommendedPsu": 550,
    "length": 197,
    "width": 120,
    "powerConnector": "8-pin",
    "score": 60,
    "chipBrand": "NVIDIA",
    "memoryType": "GDDR7",
    "generation": 2025,
    "specs": [
      "8 ГБ GDDR7",
      "197 мм · 145 Вт",
      "Питание 8-pin"
    ],
    "sourceUrl": "https://www.msi.com/Graphics-Card/GeForce-RTX-5060-8G-VENTUS-2X-OC/Specification",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "thickness": 41
  },
  {
    "id": "extra-sapphire-pulse-rx-9070-xt",
    "category": "gpu",
    "brand": "Sapphire",
    "name": "PULSE Radeon RX 9070 XT 16GB",
    "price": 82900,
    "vram": 16,
    "power": 304,
    "recommendedPsu": 750,
    "length": 320,
    "width": 120.25,
    "powerConnector": "2×8-pin",
    "score": 143,
    "chipBrand": "AMD",
    "memoryType": "GDDR6",
    "generation": 2025,
    "specs": [
      "16 ГБ GDDR6",
      "320 мм · 304 Вт",
      "Питание 2×8-pin"
    ],
    "sourceUrl": "https://www.sapphiretech.com/en/consumer/pulse-radeon-rx-9070-xt-16g-gddr6",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "thickness": 61.6,
    "slots": 3
  },
  {
    "id": "extra-sapphire-pulse-rx-9070",
    "category": "gpu",
    "brand": "Sapphire",
    "name": "PULSE Radeon RX 9070 16GB",
    "price": 72900,
    "vram": 16,
    "power": 220,
    "recommendedPsu": 650,
    "length": 280,
    "width": 120.25,
    "powerConnector": "2×8-pin",
    "score": 125,
    "chipBrand": "AMD",
    "memoryType": "GDDR6",
    "generation": 2025,
    "specs": [
      "16 ГБ GDDR6",
      "280 мм · 220 Вт",
      "Питание 2×8-pin"
    ],
    "sourceUrl": "https://www.sapphiretech.com/en/consumer/pulse-radeon-rx-9070-16g-gddr6",
    "sourceCheckedAt": "2026-10-30",
    "sourceVerification": "manufacturer-product-specification",
    "thickness": 51.5,
    "slots": 2.5
  }
];
