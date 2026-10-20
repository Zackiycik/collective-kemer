import manifest from "./photos.json";

export type PhotoName = keyof typeof manifest;

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const ALT: Record<PhotoName, string> = {
  "courtyard-tent": "Çadır Meydan ve avlu, ağaçların arasında ışık girlandları",
  "live-vocalist": "Mikrofonda şarkı söyleyen müzisyen",
  "live-duo": "Çadır Meydan'da sahne alan müzisyen ikilisi",
  "aerial-campus-top": "Collective Kemer'in ormanın içindeki kuşbakışı görünümü",
  "aerial-campus-arc": "Amfi ve yapıların havadan görünümü",
  "amphitheater-screen-dusk": "Gün batımında açık hava sineması amfisi",
  "amphitheater-screen": "Perdesi açık, izleyicilerle dolu amfi",
  "aerial-night": "Gece havadan çekilmiş ışıklı kampüs",
  "terrace-umbrella-dusk": "Şemsiyeli teras ve ormanın üzerinde alacakaranlık",
  "tent-night": "Çadır Meydan'ın gece ışıkları altındaki iç mekânı",
  "tent-piano-night": "Çadır Meydan'da piyano ve sıcak ışıklı oturma alanı",
  "atolye-interior-1": "Atölye'nin ahşap iç mekânı, uzun toplantı masası ve yeşil sandalyeler",
  "atolye-interior-2": "Atölye'de geniş camlar, projeksiyon perdesi ve oturma köşesi",
  "atolye-interior-3": "Atölye'de ormana bakan geniş pencereler ve masa düzeni",
  "atolye-interior-4": "Atölye'de ahşap tavan ve sıralı yeşil sandalyeler",
  "drone-amphi-umbrellas": "Amfi, sahne ve kırmızı şemsiyeli çimenlik alanın havadan görünümü",
  "drone-amphi-wide": "Kıvrımlı amfi basamakları ve yuvarlak sahne, havadan",
  "drone-campus-topdown": "Kampüsün tam tepeden görünümü: çadır, kulübeler ve amfi",
  "drone-stage-umbrella": "Açık hava sahnesi, şemsiyeler ve şezlonglar",
  "drone-tent-interior": "Çadır Meydan'ın içi: piyano, turuncu koltuklar ve yeşil perdeler",
  "drone-atolye-interior": "Atölye'de uzun masa ve yeşil sandalyeler, ormana bakan pencereler",
  "aerial-dance-floor": "Amfi sahnesinde dans edenlerin havadan görünümü",
  "aerial-lawn-umbrellas": "Çimenlik alanda kırmızı şemsiyeler ve oturma grupları",
  "dance-1": "Gün batımında amfide dans eden çift",
  "food-breakfast-honey": "Kahvaltı masasında bal ve peynir tabağı",
  "food-breakfast-table": "Zengin bir kahvaltı sofrası",
  "food-plate-juice": "Ahşap masada ana yemek ve portakal suyu",
  "food-chicken-fries": "Çıtır tavuk ve patates kızartması",
  "food-chicken-plate": "Tavuk tabağı, soslar ve meyve suyu",
  "food-napkin-logo": "Collective Kemer logolu peçete ve salata",
  "food-salad-bowl": "Halloumi'li yeşil salata",
  "food-schnitzel": "Parmesanlı şnitzel tabağı",
  "corp-long-tables": "Ormanın içinde uzun ahşap masalarda yapılan kurumsal öğle yemeği",
  "corp-tent-audience": "Çadır Meydan'da sandalyelerde oturan, sahneyi izleyen kalabalık",
  "corp-buffet-line": "Açık büfe servisinde sıraya girmiş misafirler ve kırmızı şemsiyeler",
  "game-board": "Takım aktivitesi: mavi çerçeveli ahşap oyun masası",
  "game-rope": "Takım oyunu: iplerle turuncu bir figürü yönlendiren ekip",
  "game-basketball": "Çimenlikte kurulmuş basketbol potası ve yarışma alanı",
  "game-survivor": "Survivor temalı aktivite alanı ve katılan ekip",
  "davet-flower-arch": "Ormanın içinde çiçeklerle süslenmiş davet kemeri",
  "davet-bouquet": "Davet masasında turuncu ve krem tonlarında çiçek aranjmanı",
  "davet-table-sky": "Açık havada krem örtülü, mumlu ve çiçekli uzun davet masası",
  "davet-table-long": "Ahşap sandalyelerle dizilmiş çiçekli uzun davet masası",
  "davet-garden-aerial": "Davet bahçesinin havadan görünümü",
  "tent-lounge": "Turuncu koltuklu, ahşap tavanlı oturma alanı",
  "food-wraps": "Tabakta sıralanmış tavuklu mini dürümler",
  "food-sliders": "Kürdanlı mini hamburger servisi",
  "food-croquettes": "Cam servis tepsisinde mini kroket",
};

export function photo(name: PhotoName): Photo {
  const { width, height } = manifest[name];
  return { src: `/media/photos/${name}.webp`, width, height, alt: ALT[name] };
}
