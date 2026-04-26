/**
 * ============================================================================
 * DOSYA: src/constants/courses.ts
 * GÖREV: YTÜ'deki ders kodlarını ve o derse ait değişmeyen malzeme listelerini tutar.
 * * YAPILACAKLAR:
 * 1. 'COURSE_MATERIALS' adında bir sabit (const) obje oluşturulacak.
 * - Anahtar (Key) : Ders Kodu olacak (Örn: "BLM3011")
 * - Değer (Value): O dersin zorunlu malzemelerini içeren string dizisi olacak.
 * 2. İlan verme sayfasında fotoğraf yüklenmeyeceği için, form bu dosyadan
 * beslenecek. Tüm dersleri buraya manuel olarak ekleyeceğiz.
 * ============================================================================
 */

// Sabit listeler buraya yazılacak...
/**
 * ============================================================================
 * DOSYA: src/constants/courses.ts
 * GÖREV: YTÜ'deki ders kodlarını ve o derse ait değişmeyen malzeme listelerini tutar.
 * ============================================================================
 */

export const DERS_MALZEMELERI: Record<string, string[]> = {
  BLM2611: [
    "7400 (NAND)",
    "7402 (NOR)",
    "7404 (Inverter)",
    "7410 (3-input NAND)",
    "7420 (4-input NAND)",
    "7427 (3-input NOR)",
    "7432 (OR)",
    "7408 (AND)",
    "7474 (D Flip-Flop)",
    "7486 (XOR)",
    "74112 (JK Flip-Flop)",
    "74153 (Multiplexer)",
    "Jumper Kablo",
  ],
  BLM1033: [
    "Direnç Seti",
    "Kondansatör Seti",
    "Diyot",
    "Breadboard",
    "Jumper Kablo Seti",
    "Multimetre",
  ],
  "Breadboard": [
    "Tam Boy Breadboard"

  ],
  "Multimetre": [
    "Dijital Multimetre",
    "Multimetre Probu",
  ],

};

export const DERS_KODLARI = Object.keys(DERS_MALZEMELERI);
