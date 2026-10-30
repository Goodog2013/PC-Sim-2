# Источники каталога PC-Sim 2

Дата проверки: **30 октября 2026 года**. Базовый каталог содержит **57 реальных моделей и вариантов ёмкости**: 9 процессоров, 9 видеокарт, 7 материнских плат, 8 комплектов RAM, 7 SSD, 6 кулеров, 6 блоков питания и 5 корпусов.

## Что проверено

Основные характеристики и ограничения сверены с публичными страницами производителей: сокеты, поколение памяти, число ядер и потоков, заявленные частоты, объём VRAM, мощность GPU, рекомендованная мощность БП, длина GPU, форм-факторы, число DIMM и M.2, допустимые габариты компонентов. Страницы были получены напрямую с сайтов производителей. Для семейства Kingston FURY использованы таблицы серии; для комплекта DDR5-6000 32 ГБ EXPO также приведён официальный лист KF560C36BBEK2-32. Поле sourceVerification отличает страницу отдельного продукта от спецификации серии.

Это **курируемый каталог**, а не список всех компонентов на рынке и не обещание наличия в магазинах. Старые URL, которые отдавали 404 или перенаправляли на общую витрину без спецификаций, не использованы для соответствующих моделей. В частности, в базовый каталог не вошли непроверенные варианты Ryzen 5 5600 без X, AK400, NV2, North и RX 7900 XTX.

## Что является моделью симулятора

| Поле | Значение и ограничения |
| --- | --- |
| price | Условная цена в рублях для игровой экономики. Не актуальная рыночная цена, не предложение магазина. |
| score | Авторский относительный индекс, не измеренный бенчмарк. CPU: 7800X3D = 100; GPU: RTX 4070 SUPER = 100. Значения могут превышать 100. |
| coolingCapacity | Приближённый тепловой бюджет для симулятора, не гарантированная производителем способность охлаждать CPU. |
| peakPower | Для Intel используется Maximum Turbo Power из спецификации. Для AMD — консервативный расчётный электрический предел класса мощности, который не равен TDP и не описывает реальную нагрузку каждой игры. |
| storage.power | Единый расчётный запас 8 Вт для SSD; не измеренное потребление каждой модели. |
| Результаты теста | FPS, температура, шум и производительность являются расчётной симуляцией; они не получены запуском настоящей игры или оборудования. |
| 3D | Схематические процедурные модели. Они показывают расположение и установку компонентов; это не CAD-модели производителей и не точные цифровые копии. |

## Важные детали совместимости

- DDR4 и DDR5 используют разные разъёмы. Поддержка обоих типов CPU Intel не означает, что выбранная плата поддерживает оба.
- Скорости RAM указаны в **MT/s**. Профили XMP/EXPO, их стабильность и пределы контроллера зависят от процессора, платы, числа модулей и BIOS. Выбор комплекта DDR5-6000 сам по себе не гарантирует 6000 MT/s.
- Поддержка семейства CPU платой подразумевает подходящую версию BIOS. Каталог не воспроизводит матрицы версий прошивок и QVL памяти.
- Видеокарты MSI представлены конкретными моделями VENTUS. Видеокарты NVIDIA с пометкой Founders Edition и AMD Radeon — соответствующими референсными вариантами. Размеры другой версии того же GPU могут отличаться.
- Для MSI RTX 4060 производитель указывает 115 или 120 Вт: расчёт использует 120 Вт.
- Адаптеры питания NVIDIA учтены отдельно: RTX 4070/4070 SUPER требуют два PCIe 8-pin, RTX 4080 SUPER/4090 — три для штатного режима; при наличии подходящего нативного кабеля используется он. Число разъёмов не заменяет проверку допустимой мощности кабелей реального БП.
- Corsair RMx в этом каталоге — версии **2021 года**, не RMx SHIFT и не последующие обновления ATX 3.x.
- Для оригинального Noctua NH-D15 используется высота **165 мм**, указанная в описании совместимости на странице оригинальной модели. Во время проверки вкладка specifications показывала противоречивые 168 мм — ту же высоту, что у отдельного NH-D15 G2. Эти модели не объединены. При поднятии переднего вентилятора над высокой RAM требуется дополнительный зазор.
- DeepCool AK620 допускает RAM до 43 мм с двумя вентиляторами. У других башенных кулеров геометрия перекрытия RAM также требует проверки перед реальной покупкой.
- У ARCTIC Liquid Freezer III радиатор имеет толщину 38 мм, вентиляторы — 25 мм. Поддержка длины радиатора корпусом не гарантирует прохождение всей сборки по толщине и отсутствие конфликта с VRM/RAM.
- Corsair 4000D поддерживает радиатор 360 мм спереди; он уменьшает место для GPU. В Pop Air радиатор 280 мм также устанавливается спереди. В LANCOOL 216 верхний монтаж СЖО требует нижнего положения платы, с зазором 63 мм для радиатора с вентиляторами.
- ASUS AP201 имеет несколько положений БП: максимальная длина GPU, длина БП и положение кабелей не являются независимыми величинами. Проверка симулятора покрывает основные ограничения, но не все варианты физической компоновки.
- Goodog Edition повторяет известные CPU, GPU, плату и объём/тип RAM пользователя. Конкретные модели корпуса, кулера, SSD и БП — иллюстративная комплектация внутри каталога, а не утверждение о фактическом составе его ПК.

## Официальные страницы

Названия, товарные знаки и бренды принадлежат их владельцам. Ссылки ниже ведут к источникам характеристик и не означают партнёрство с производителями.

### Процессоры

| Модель | Источник |
| --- | --- |
| AMD Ryzen 5 5600X | [Производитель](https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5600x.html) |
| AMD Ryzen 9 5900X | [Производитель](https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-9-5900x.html) |
| AMD Ryzen 5 7600 | [Производитель](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-5-7600.html) |
| AMD Ryzen 7 7700X | [Производитель](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7700x.html) |
| AMD Ryzen 7 7800X3D | [Производитель](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7800x3d.html) |
| AMD Ryzen 9 7950X | [Производитель](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7950x.html) |
| Intel Core i5-12400F | [Производитель](https://www.intel.com/content/www/us/en/products/sku/134587/intel-core-i512400f-processor-18m-cache-up-to-4-40-ghz/specifications.html) |
| Intel Core i5-13600K | [Производитель](https://www.intel.com/content/www/us/en/products/sku/230493/intel-core-i513600k-processor-24m-cache-up-to-5-10-ghz/specifications.html) |
| Intel Core i7-14700K | [Производитель](https://www.intel.com/content/www/us/en/products/sku/236783/intel-core-i7-processor-14700k-33m-cache-up-to-5-60-ghz/specifications.html) |

### Видеокарты

| Модель | Источник |
| --- | --- |
| MSI GeForce RTX 3060 VENTUS 2X 12G OC | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-3060-VENTUS-2X-12G-OC/Specification) |
| MSI GeForce RTX 4060 VENTUS 2X BLACK 8G OC | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4060-VENTUS-2X-BLACK-8G-OC/Specification) |
| MSI GeForce RTX 4060 Ti VENTUS 2X BLACK 16G OC | [Производитель](https://www.msi.com/Graphics-Card/GeForce-RTX-4060-Ti-VENTUS-2X-BLACK-16G-OC/Specification) |
| NVIDIA GeForce RTX 4070 Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4070-family/) |
| NVIDIA GeForce RTX 4070 SUPER Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4070-family/) |
| NVIDIA GeForce RTX 4080 SUPER Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4080-family/) |
| NVIDIA GeForce RTX 4090 Founders Edition | [Производитель](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/) |
| AMD Radeon RX 7600 | [Производитель](https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7600.html) |
| AMD Radeon RX 7800 XT | [Производитель](https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7800-xt.html) |

### Материнские платы

| Модель | Источник |
| --- | --- |
| MSI B550-A PRO | [Производитель](https://www.msi.com/Motherboard/B550-A-PRO/Specification) |
| MSI B550M PRO-VDH WIFI | [Производитель](https://www.msi.com/Motherboard/B550M-PRO-VDH-WIFI/Specification) |
| MSI B650 GAMING PLUS WIFI | [Производитель](https://www.msi.com/Motherboard/B650-GAMING-PLUS-WIFI/Specification) |
| MSI PRO B650M-A WIFI | [Производитель](https://www.msi.com/Motherboard/PRO-B650M-A-WIFI/Specification) |
| GIGABYTE B760M DS3H DDR4 | [Производитель](https://www.gigabyte.com/Motherboard/B760M-DS3H-DDR4-rev-1x) |
| MSI PRO B760-P WIFI DDR4 | [Производитель](https://www.msi.com/Motherboard/PRO-B760-P-WIFI-DDR4/Specification) |
| MSI MAG Z790 TOMAHAWK WIFI | [Производитель](https://www.msi.com/Motherboard/MAG-Z790-TOMAHAWK-WIFI/Specification) |

### Оперативная память

| Модель | Источник |
| --- | --- |
| Kingston FURY Beast 16 ГБ DDR4-3200 | [Производитель](https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr4-memory) |
| Kingston FURY Beast 32 ГБ DDR4-3200 | [Производитель](https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr4-memory) |
| Kingston FURY Beast 32 ГБ DDR4-3600 | [Производитель](https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr4-memory) |
| Kingston FURY Beast 64 ГБ DDR4-3200 | [Производитель](https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr4-memory) |
| Kingston FURY Beast 32 ГБ DDR5-5200 | [Производитель](https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr5-memory) |
| Kingston FURY Beast 32 ГБ DDR5-6000 EXPO | [Производитель](https://www.kingston.com/datasheets/KF560C36BBEK2-32.pdf) |
| Kingston FURY Beast 64 ГБ DDR5-6000 | [Производитель](https://www.kingston.com/en/memory/gaming/kingston-fury-beast-ddr5-memory) |
| Corsair VENGEANCE 32 ГБ DDR5-6000 CL30 | [Производитель](https://www.corsair.com/us/en/p/memory/cmk32gx5m2b6000c30/vengeance-32gb-2x16gb-ddr5-dram-6000mt-s-cl30-memory-kit-black-cmk32gx5m2b6000c30) |

### Накопители

| Модель | Источник |
| --- | --- |
| Kingston NV3 500 ГБ | [Производитель](https://www.kingston.com/en/ssd/nv3-nvme-pcie-ssd) |
| Kingston NV3 1 ТБ | [Производитель](https://www.kingston.com/en/ssd/nv3-nvme-pcie-ssd) |
| Kingston NV3 2 ТБ | [Производитель](https://www.kingston.com/en/ssd/nv3-nvme-pcie-ssd) |
| Kingston KC3000 512 ГБ | [Производитель](https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive) |
| Kingston KC3000 1 ТБ | [Производитель](https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive) |
| Kingston KC3000 2 ТБ | [Производитель](https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive) |
| Kingston KC3000 4 ТБ | [Производитель](https://www.kingston.com/en/ssd/kc3000-nvme-m2-solid-state-drive) |

### Охлаждение

| Модель | Источник |
| --- | --- |
| Thermalright Assassin X 120 Refined SE | [Производитель](https://www.thermalright.com/product/assassin-x-120-refined-se/) |
| Thermalright Peerless Assassin 120 SE | [Производитель](https://www.thermalright.com/product/peerless-assassin-120-se/) |
| DeepCool AK620 | [Производитель](https://www.deepcool.com/products/Cooling/cpuaircoolers/AK620-High-Performance-CPU-Cooler/2021/13067.shtml) |
| Noctua NH-D15 | [Производитель](https://www.noctua.at/en/products/nh-d15) |
| ARCTIC Liquid Freezer III 240 | [Производитель](https://www.arctic.de/en/Liquid-Freezer-III-240/ACFRE00134A) |
| ARCTIC Liquid Freezer III 360 | [Производитель](https://www.arctic.de/en/Liquid-Freezer-III-360/ACFRE00136A) |

### Блоки питания

| Модель | Источник |
| --- | --- |
| MSI MAG A650BN | [Производитель](https://www.msi.com/Power-Supply/MAG-A650BN/Specification) |
| MSI MAG A750GL PCIE5 | [Производитель](https://www.msi.com/Power-Supply/MAG-A750GL-PCIE5/Specification) |
| MSI MAG A850GL PCIE5 | [Производитель](https://www.msi.com/Power-Supply/MAG-A850GL-PCIE5/Specification) |
| Corsair RM750x (2021) | [Производитель](https://www.corsair.com/us/en/p/psu/cp-9020199-na/rmx-series-rm750x-750-watt-80-plus-gold-fully-modular-atx-psu-cp-9020199-na) |
| Corsair RM850x (2021) | [Производитель](https://www.corsair.com/us/en/p/psu/cp-9020200-na/rmx-series-rm850x-850-watt-80-plus-gold-fully-modular-atx-psu-cp-9020200-na) |
| Corsair RM1000x (2021) | [Производитель](https://www.corsair.com/us/en/p/psu/cp-9020201-na/rmx-series-rm1000x-1000-watt-80-plus-gold-fully-modular-atx-psu-cp-9020201-na) |

### Корпуса

| Модель | Источник |
| --- | --- |
| Corsair 4000D AIRFLOW | [Производитель](https://www.corsair.com/us/en/p/pc-cases/cc-9011200-ww/4000d-airflow-tempered-glass-mid-tower-atx-case-black-cc-9011200-ww) |
| Fractal Design Pop Air RGB | [Производитель](https://www.fractal-design.com/products/cases/pop-series/pop-air/pop-air-rgb-black-tg-clear-tint/) |
| Fractal Design Pop Mini Air RGB | [Производитель](https://www.fractal-design.com/products/cases/pop-series/pop-mini-air/pop-mini-air-rgb-black-tg-clear-tint/) |
| Lian Li LANCOOL 216 RGB | [Производитель](https://lian-li.com/product/lancool-216/) |
| ASUS Prime AP201 | [Производитель](https://www.asus.com/motherboards-components/cases/prime/asus-prime-ap201-microatx-case/techspec/) |
