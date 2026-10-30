# Расширение каталога: видеокарты, SSD, охлаждение, БП и корпуса

Проверено **30 октября 2026 года**. Модуль `src/catalog-extra-hardware.js` добавляет **128 реальных моделей и аппаратных вариантов** к базовому каталогу. Отдельные ёмкости SSD и варианты с радиатором имеют разные реальные артикулы; это не искусственные переименования одной детали.

| Категория | Новых вариантов |
| --- | ---: |
| Видеокарты | 39 |
| NVMe SSD | 22 |
| Охлаждение CPU | 21 |
| Блоки питания | 20 |
| Корпуса | 26 |
| **Всего** | **128** |

## Проверка источников

Использованы публичные спецификации MSI, Intel, Samsung, Sandisk / WD, Kingston, DeepCool, Noctua, Thermalright, ARCTIC, Seasonic, Corsair, Fractal Design, Cooler Master и Lian Li. Каждый включённый адрес был получен напрямую, а технические значения прочитаны из страницы. Ответ HTTP 200 сам по себе не считался подтверждением: страницы с отказом, пустой спецификацией или перенаправлением на общую витрину исключены.

- **manufacturer-product-specification** — точная страница модели.
- **manufacturer-variant-table** — официальный список вариантов одного семейства, с отдельными ёмкостями / артикулами.
- **manufacturer-family-specification-partial** и **manufacturer-product-specification-partial** — подтверждены основные характеристики; непроверенные дополнительные поля отсутствуют и перечислены в `unknownSpecs`.

Внешние страницы могут меняться после даты проверки. В каталоге нет обещания наличия товара или того, что это самые новые модели.

## Что считается условным

`price` — игровая цена в рублях, не актуальная стоимость магазина. GPU `score` и `coolingCapacity` — параметры упрощённой модели, не реальные измерения. Для большинства SSD `power` — единый расчётный запас 8 Вт; у Kingston FURY Renegade использованы указанные производителем максимумы записи 6,3 / 9,9 / 10,2 Вт. Видеокарты используют заявленную мощность и рекомендацию БП производителя конкретной платы.

## Ограничения, которые нельзя спрятать за зелёной галочкой

1. **GPU.** У 30 моделей MSI прочитаны точные длина, ширина, толщина, VRAM, мощность и питание. Толщина в миллиметрах не превращена в выдуманное число слотов. RTX 2070 SUPER VENTUS требует 8-pin + 6-pin и два отдельных подходящих разъёма; это отмечено `requiredPcieConnectors:2`. GTX 1650 D6 питается от слота. Intel B580 — референсная Limited Edition; для производительности важен Resizable BAR.
2. **NVMe.** Все 22 накопителя — M.2 2280 NVMe, включая PCIe 3.0 WD Green SN350. SATA 2.5 и M.2 SATA не добавлены в существующую модель одного M.2 накопителя. Версии SSD с радиатором требуют отдельной проверки зазора под кожухом платы.
3. **БП.** Для девяти MSI указано проверенное число разъёмов. Для оригинальных Seasonic FOCUS GX/PX и двух Corsair известны мощность, размер и форм-фактор, но неоднозначный комплект кабелей разных ревизий не подменён догадкой: поле `connectors` отсутствует, `unknownSpecs` содержит его имя. Серии FOCUS 2019 и Corsair SF750 2018 / RM650x 2021 явно отделены от одноимённых новых версий.
4. **Сокеты кулеров.** NH-L9a-AM4 подходит только к AM4; исходный NH-L9i — к 115x/1200, не к 1700. У остальных моделей указаны проверенные сокеты, включая 1851 там, где он есть на странице. Совместимость крепления не гарантирует способность рассеивать любую мощность.
5. **NH-L12S.** Есть нижний и верхний варианты положения вентилятора. В расчёт внесён консервативный высокий режим 86 мм; в примечании объяснён низкий 70 мм. Высота RAM и положение вентилятора связаны.
6. **Оригинальный NH-D15.** В базовом каталоге отдельно исправлена высота на 165 мм по тексту страницы оригинальной модели. Вкладка specifications при проверке противоречиво показывала 168 мм, как у отдельного NH-D15 G2; это расхождение не скрыто и описано в базовом документе.
7. **CH160.** GPU до 305 мм только с SFX/SFX-L; с ATX лимит 230 мм. Радиаторы СЖО отсутствуют в допустимом списке: `radiatorSupport:[]`.
8. **Компактные корпуса.** NR200/NR200P и Terra используют SFX/SFX-L. В NR200P со стеклом кулер до 153 мм, с сеткой 155 мм; вертикальная видеокарта снижает лимит до 76 мм и конфликтует с боковой СЖО. В Terra толщина GPU и высота кулера связаны положением центральной рамы — выбран консервативный предел 48 мм, а не обещание одновременно получить все максимумы.
9. **Другие габариты.** Предельные длины GPU в Meshify 2 / Define 7 относятся к открытой компоновке. Передние радиаторы, вентиляторы и корзины сокращают место. У CH370 / CH360 внесён отдельный предел 320 мм с передней СЖО. У A3-mATX положение БП и радиатора связано с длиной GPU. У TD500 Mesh V2 верхняя СЖО рекомендована общей толщиной до 55 мм.
10. **Неизвестные поля.** Например, точный предел длины БП и список радиаторов Node 304 на прочитанной спецификации не раскрыты. Эти значения отсутствуют и помечены, а не заполнены предполагаемыми числами. Неполные данные не являются гарантией физической совместимости.

## English provenance note

This module adds 128 real hardware variants. All included manufacturer pages were retrieved and inspected. Variant tables are explicitly distinguished from exact product pages; missing optional dimensions or cable counts are omitted and listed in `unknownSpecs`, never invented. Prices, relative performance scores and cooling-capacity values are simulation inputs. Physical maxima can depend on case layout, fan position, radiator thickness and the PSU revision. The catalog is a curated educational dataset, not a live shopping feed or a substitute for manufacturer compatibility manuals.

## Официальные источники по моделям

### Видеокарты

| Модель | Артикул / уточнение | Источник |
| --- | --- | --- |
| MSI GeForce GTX 1650 D6 VENTUS XS OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-GTX-1650-D6-VENTUS-XS-OC/Specification) |
| MSI GeForce GTX 1660 SUPER VENTUS XS OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-GTX-1660-SUPER-VENTUS-XS-OC/Specification) |
| MSI GeForce RTX 2060 VENTUS GP OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-2060-VENTUS-GP-OC/Specification) |
| MSI GeForce RTX 2060 SUPER VENTUS GP OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-2060-SUPER-VENTUS-GP-OC/Specification) |
| MSI GeForce RTX 2070 SUPER VENTUS OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-2070-SUPER-VENTUS-OC/Specification) |
| MSI GeForce RTX 3050 VENTUS 2X 8G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3050-VENTUS-2X-8G-OC/Specification) |
| MSI GeForce RTX 3060 Ti VENTUS 2X 8G OCV1 LHR | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3060-Ti-VENTUS-2X-8G-OCV1-LHR/Specification) |
| MSI GeForce RTX 3070 VENTUS 2X OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3070-VENTUS-2X-OC/Specification) |
| MSI GeForce RTX 3070 Ti VENTUS 3X 8G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3070-Ti-VENTUS-3X-8G-OC/Specification) |
| MSI GeForce RTX 3080 VENTUS 3X 10G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3080-VENTUS-3X-10G-OC/Specification) |
| MSI GeForce RTX 3080 Ti VENTUS 3X 12G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3080-Ti-VENTUS-3X-12G-OC/Specification) |
| MSI GeForce RTX 3090 VENTUS 3X 24G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3090-VENTUS-3X-24G-OC/Specification) |
| MSI GeForce RTX 4070 VENTUS 2X 12G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4070-VENTUS-2X-12G-OC/Specification) |
| MSI GeForce RTX 4070 Ti VENTUS 3X 12G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4070-Ti-VENTUS-3X-12G-OC/Specification) |
| MSI GeForce RTX 4080 16GB VENTUS 3X OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4080-16GB-VENTUS-3X-OC/Specification) |
| MSI GeForce RTX 4090 VENTUS 3X 24G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4090-VENTUS-3X-24G-OC/Specification) |
| MSI GeForce RTX 4070 SUPER 12G VENTUS 2X OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4070-SUPER-12G-VENTUS-2X-OC/Specification) |
| MSI GeForce RTX 4070 Ti SUPER 16G VENTUS 3X OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4070-Ti-SUPER-16G-VENTUS-3X-OC/Specification) |
| MSI GeForce RTX 4080 SUPER 16G VENTUS 3X OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4080-SUPER-16G-VENTUS-3X-OC/Specification) |
| MSI GeForce RTX 4060 Ti GAMING X SLIM 16G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4060-Ti-GAMING-X-SLIM-16G/Specification) |
| MSI Radeon RX 6600 MECH 2X 8G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6600-MECH-2X-8G/Specification) |
| MSI Radeon RX 6600 XT MECH 2X 8G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6600-XT-MECH-2X-8G-OC/Specification) |
| MSI Radeon RX 6650 XT MECH 2X 8G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6650-XT-MECH-2X-8G-OC/Specification) |
| MSI Radeon RX 6700 XT MECH 2X 12G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6700-XT-MECH-2X-12G-OC/Specification) |
| MSI Radeon RX 6750 XT MECH 2X 12G OC | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6750-XT-MECH-2X-12G-OC/Specification) |
| MSI Radeon RX 6800 GAMING X TRIO 16G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6800-GAMING-X-TRIO-16G/Specification) |
| MSI Radeon RX 6800 XT GAMING X TRIO 16G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6800-XT-GAMING-X-TRIO-16G/Specification) |
| MSI Radeon RX 6900 XT GAMING X TRIO 16G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-6900-XT-GAMING-X-TRIO-16G/Specification) |
| MSI Radeon RX 7900 XT GAMING TRIO CLASSIC 20G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-7900-XT-GAMING-TRIO-CLASSIC-20G/Specification) |
| MSI Radeon RX 7900 XTX GAMING TRIO CLASSIC 24G | Точная модель | [Производитель](https://www.msi.com/Graphics-Card/Radeon-RX-7900-XTX-GAMING-TRIO-CLASSIC-24G/Specification) |
| Intel Arc B580 Limited Edition | Точная модель | [Производитель](https://www.intel.com/content/www/us/en/products/sku/241598/intel-arc-b580-graphics/specifications.html) |

### Накопители NVMe

| Модель | Артикул / уточнение | Источник |
| --- | --- | --- |
| WD_BLACK SN850X 1 ТБ | WDS100T2X0E-00BCA0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 1 ТБ Heatsink | WDS100T2XHE-00BCA0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 2 ТБ | WDS200T2X0E-00BCA0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 2 ТБ Heatsink | WDS200T2XHE-00BCA0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 4 ТБ | WDS400T2X0E-00BCA0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 4 ТБ Heatsink | WDS400T2XHE-00BCA0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 8 ТБ | WDS800T2X0E-00CDD0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD_BLACK SN850X 8 ТБ Heatsink | WDS800T2XHE-00CDD0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd?sku=WDS100T2X0E-00BCA0) |
| WD Blue SN5000 500 ГБ | WDS500G4B0E-00CNZ0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd) |
| WD Blue SN5000 1 ТБ | WDS100T4B0E-00CNZ0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd) |
| WD Blue SN5000 2 ТБ | WDS200T4B0E-00CNZ0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd) |
| WD Blue SN5000 4 ТБ | WDS400T4B0E-00BKY0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-blue-sn5000-nvme-ssd) |
| WD Green SN350 250 ГБ | WDS250G2G0C-00CDH0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-green-sn350-nvme-ssd) |
| WD Green SN350 500 ГБ | WDS500G2G0C-00CDH0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-green-sn350-nvme-ssd) |
| WD Green SN350 2 ТБ | WDS200T3G0C-00AZL0 | [Производитель](https://www.sandisk.com/products/ssd/internal-ssd/wd-green-sn350-nvme-ssd) |
| Samsung 990 PRO 1 ТБ | MZ-V9P1T0BW | [Производитель](https://www.samsung.com/uk/memory-storage/nvme-ssd/990-pro-1tb-nvme-pcie-gen-4-mz-v9p1t0bw/) |
| Samsung 990 PRO 2 ТБ | MZ-V9P2T0BW | [Производитель](https://www.samsung.com/uk/memory-storage/nvme-ssd/990-pro-2tb-nvme-pcie-gen-4-mz-v9p2t0bw/) |
| Samsung 990 PRO 4 ТБ | MZ-V9P4T0BW | [Производитель](https://www.samsung.com/uk/memory-storage/nvme-ssd/990-pro-4tb-nvme-pcie-gen-4-mz-v9p4t0bw/) |
| Kingston FURY Renegade 1 ТБ Heatsink | Таблица вариантов | [Производитель](https://www.kingston.com/en/ssd/gaming/kingston-fury-renegade-nvme-m2-ssd) |
| Kingston FURY Renegade 2 ТБ Heatsink | Таблица вариантов | [Производитель](https://www.kingston.com/en/ssd/gaming/kingston-fury-renegade-nvme-m2-ssd) |
| Kingston FURY Renegade 4 ТБ Heatsink | Таблица вариантов | [Производитель](https://www.kingston.com/en/ssd/gaming/kingston-fury-renegade-nvme-m2-ssd) |
| Kingston NV3 4 ТБ | SNV3S/4000G | [Производитель](https://www.kingston.com/en/ssd/nv3-nvme-pcie-ssd) |

### Охлаждение

| Модель | Артикул / уточнение | Источник |
| --- | --- | --- |
| DeepCool AK400 | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/AK400-Performance-CPU-Cooler-1851-1700-AM5/2024/15222.shtml) |
| DeepCool AK500 | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/AK500-High-Performance-CPU-Cooler-1851-1700-AM5/2022/16040.shtml) |
| DeepCool ASSASSIN IV | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/Assassin-IV-Premium-CPU-Air-Cooler-1851-1700-AM5/2024/17129.shtml) |
| DeepCool ASSASSIN 4S | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/Assassin-4S-Minimalistic-Premium-CPU-Air-Cooler-1851-1700-AM5/2023/17881.shtml) |
| DeepCool AN600 | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/AN600-Top-Flow-Low-Profile-Cooler-1851-1700-AM5/2023/16837.shtml) |
| DeepCool AG400 | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/GAMMAXX-AG400-Single-Tower-CPU-Cooler-1851-1700-AM5/2024/15898.shtml) |
| DeepCool AG620 | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/GAMMAXX-AG620-Dual-Tower-CPU-Cooler-1851-1700-AM5/2024/15900.shtml) |
| DeepCool AS500 PLUS | Точная модель | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/AS500-PLUS-Dual-Fan-CPU-Cooler/2021/11415.shtml) |
| Noctua NH-U12A | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-u12a/specifications) |
| Noctua NH-U12S | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-u12s/specifications) |
| Noctua NH-U12S redux | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-u12s-redux/specifications) |
| Noctua NH-D15S | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-d15s/specifications) |
| Noctua NH-L9a-AM4 | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-l9a-am4/specifications) |
| Noctua NH-L9i | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-l9i/specifications) |
| Noctua NH-L12S | Точная модель | [Производитель](https://www.noctua.at/en/products/nh-l12s/specifications) |
| Thermalright Phantom Spirit 120 SE | Точная модель | [Производитель](https://www.thermalright.com/product/phantom-spirit-120-se/) |
| Thermalright Frost Spirit 140 | Точная модель | [Производитель](https://www.thermalright.com/product/frost-spirit-140/) |
| Thermalright Silver Soul 135 | Точная модель | [Производитель](https://www.thermalright.com/product/silver-soul-135/) |
| Thermalright AXP120-X67 | Точная модель | [Производитель](https://www.thermalright.com/product/axp120-x67/) |
| ARCTIC Liquid Freezer III 280 | Точная модель | [Производитель](https://www.arctic.de/en/Liquid-Freezer-III-280/ACFRE00135A) |
| ARCTIC Liquid Freezer III 420 | Точная модель | [Производитель](https://www.arctic.de/en/Liquid-Freezer-III-420/ACFRE00137A) |

### Блоки питания

| Модель | Артикул / уточнение | Источник |
| --- | --- | --- |
| MSI MAG A550BN | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MAG-A550BN/Specification) |
| MSI MAG A650GL | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MAG-A650GL/Specification) |
| MSI MAG A1000GL PCIE5 | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MAG-A1000GL-PCIE5/Specification) |
| MSI MPG A750GF | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MPG-A750GF/Specification) |
| MSI MPG A850GF | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MPG-A850GF/Specification) |
| MSI MPG A850G PCIE5 | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MPG-A850G-PCIE5/Specification) |
| MSI MPG A1000G PCIE5 | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MPG-A1000G-PCIE5/Specification) |
| MSI MEG Ai1300P PCIE5 | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MEG-Ai1300P-PCIE5/Specification) |
| MSI MEG Ai1000P PCIE5 | Точная модель | [Производитель](https://www.msi.com/Power-Supply/MEG-Ai1000P-PCIE5/Specification) |
| Seasonic FOCUS GX-550 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-gx/) |
| Seasonic FOCUS GX-650 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-gx/) |
| Seasonic FOCUS GX-750 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-gx/) |
| Seasonic FOCUS GX-850 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-gx/) |
| Seasonic FOCUS GX-1000 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-gx/) |
| Seasonic FOCUS PX-550 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-px/) |
| Seasonic FOCUS PX-650 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-px/) |
| Seasonic FOCUS PX-750 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-px/) |
| Seasonic FOCUS PX-850 (2019) | Есть непроверенные дополнительные поля | [Производитель](https://seasonic.com/focus-px/) |
| Corsair SF750 Platinum (2018) | Есть непроверенные дополнительные поля | [Производитель](https://www.corsair.com/us/en/p/psu/cp-9020186-na/sf-series-sf750-750-watt-80-plus-platinum-certified-high-performance-sfx-psu-cp-9020186-na) |
| Corsair RM650x (2021) | Есть непроверенные дополнительные поля | [Производитель](https://www.corsair.com/us/en/p/psu/cp-9020198-na/rmx-series-rm650x-650-watt-80-plus-gold-fully-modular-atx-psu-cp-9020198-na) |

### Корпуса

| Модель | Артикул / уточнение | Источник |
| --- | --- | --- |
| DeepCool CH160 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CH160-Portable-High-Airflow-M-ITX-Case/2024/18115.shtml) |
| DeepCool CH370 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CH370-Micro-ATX-Case/2022/15949.shtml) |
| DeepCool CH360 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CH360-New-Generation-of-Airflow-M-ATX-Case/2023/17713.shtml) |
| DeepCool CH560 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CH560-New-Generation-of-Airflow-Case/2023/17101.shtml) |
| DeepCool CH510 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CH510-Mid-Tower-ATX-Case/2022/15764.shtml) |
| DeepCool CC560 V2 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CC560-V2-Mid-Tower-Airflow-Case/2023/17782.shtml) |
| DeepCool CG560 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CG560-Airflow-Mid-Tower-ATX-Case/2021/13520.shtml) |
| DeepCool MACUBE 110 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/Macube-110-Micro-ATX-Case/2021/4670.shtml) |
| DeepCool MATREXX 40 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/Matrexx-40-Airflow-Micro-ATX-Case/2021/11876.shtml) |
| DeepCool CH780 | Точная модель | [Производитель](https://www.deepcool.com/products/Cases/CH780-Panoramic-Tempered-Glass-ATX-Case/2023/17534.shtml) |
| Fractal Design Meshify 2 | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/meshify-series/meshify-2/meshify-2-black-light-tg/) |
| Fractal Design Meshify 2 Compact | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/meshify-series/meshify-2-compact/meshify-2-compact-black-dark-tg/) |
| Fractal Design Define 7 | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/define-series/define-7/black/) |
| Fractal Design Define 7 Compact | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/define-series/define-7-compact/define-7-compact-black-solid/) |
| Fractal Design Node 304 | Есть непроверенные дополнительные поля | [Производитель](https://www.fractal-design.com/products/cases/node-series/node-304/node-304-black/) |
| Fractal Design Node 804 | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/node-series/node-804/node-804/) |
| Fractal Design Torrent RGB | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/torrent-series/torrent/torrent-rgb-black-tg-light-tint/) |
| Fractal Design Terra Jade | Точная модель | [Производитель](https://www.fractal-design.com/products/cases/terra-series/terra/terra-jade/) |
| Cooler Master MasterBox NR200 | Точная модель | [Производитель](https://www.coolermaster.com/en-global/products/masterbox-nr200.html) |
| Cooler Master MasterBox NR200P | Точная модель | [Производитель](https://www.coolermaster.com/en-global/products/masterbox-nr200p.html) |
| Cooler Master MasterBox TD500 Mesh V2 | Точная модель | [Производитель](https://www.coolermaster.com/en-global/products/masterbox-td500-mesh-v2.html) |
| Cooler Master MasterBox Q300L | Точная модель | [Производитель](https://www.coolermaster.com/en-global/products/masterbox-q300l.html) |
| Lian Li O11 Dynamic EVO | Точная модель | [Производитель](https://lian-li.com/product/o11-dynamic-evo/) |
| Lian Li O11 Vision | Точная модель | [Производитель](https://lian-li.com/product/o11-vision/) |
| Lian Li LANCOOL III | Точная модель | [Производитель](https://lian-li.com/product/lancool-iii/) |
| Lian Li A3-mATX | Точная модель | [Производитель](https://lian-li.com/product/a3-matx/) |


### Дополнение: поколение видеокарт 2025 года

Добавлены восемь точно определённых моделей: RTX 5090 / 5080 / 5070 Founders Edition, MSI RTX 5070 Ti / 5060 Ti 16 ГБ / 5060 и Sapphire PULSE RX 9070 XT / 9070. У Founders Edition использованы размеры именно FE, у MSI и Sapphire — размеры конкретной платы. Radeon не представлены вымышленными референсными моделями.

RTX 5090 FE: 32 ГБ, 575 Вт, 304 мм, рекомендация БП 1000 Вт и четыре PCIe 8-pin через адаптер. RTX 5080 FE: 360 Вт, 304 мм, 850 Вт; RTX 5070 FE: 250 Вт, 242 мм, 650 Вт. Число слотов внесено только там, где его прямо указывает производитель. У новых MSI прочитана точная толщина в мм. Цены и относительные индексы остаются параметрами симулятора.

| Модель | Источник |
| --- | --- |
| NVIDIA GeForce RTX 5090 Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/) |
| NVIDIA GeForce RTX 5080 Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/) |
| NVIDIA GeForce RTX 5070 Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/) |
| MSI GeForce RTX 5070 Ti 16G VENTUS 3X OC | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-5070-Ti-16G-VENTUS-3X-OC/Specification) |
| MSI GeForce RTX 5060 Ti 16G VENTUS 2X OC PLUS | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-5060-Ti-16G-VENTUS-2X-OC-PLUS/Specification) |
| MSI GeForce RTX 5060 8G VENTUS 2X OC | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-5060-8G-VENTUS-2X-OC/Specification) |
| Sapphire PULSE Radeon RX 9070 XT 16GB | [Производитель](https://www.sapphiretech.com/en/consumer/pulse-radeon-rx-9070-xt-16g-gddr6) |
| Sapphire PULSE Radeon RX 9070 16GB | [Производитель](https://www.sapphiretech.com/en/consumer/pulse-radeon-rx-9070-16g-gddr6) |
