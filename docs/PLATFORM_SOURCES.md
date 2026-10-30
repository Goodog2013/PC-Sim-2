# Источники расширенного каталога платформ

Проверка выполнена **30 октября 2026 года**. В этом модуле добавлены **32 процессора, 40 материнских плат и 45 точных артикулов RAM** — всего **117 комплектующих** сверх исходного каталога. Файл данных: `src/catalog-extra-platforms.js`.

## Метод проверки

Для CPU прочитаны индивидуальные страницы AMD и Intel ARK: количество ядер/потоков, частоты, сокет, TDP/Processor Base Power и наличие встроенной графики. Для Intel Maximum Turbo Power взят из таблицы производителя. Для AMD `peakPower` — расчётный электрический бюджет класса TDP, а не паспортное потребление в каждой программе.

Для плат прочитаны индивидуальные страницы MSI Specification: тип RAM, число DIMM, максимальный объём памяти, M.2 и форм-фактор. Новые и старые шаблоны MSI представляют эти сведения по-разному; используется таблица соответствующего продукта. На некоторых страницах остаются скрытые устаревшие таблицы, поэтому название модели и текущая основная спецификация проверялись вместе.

Для каждого добавленного артикула RAM загружен и прочитан **отдельный официальный PDF Kingston**. Объём, число модулей, поколение DDR, заявленный профиль MT/s/CL и высота с радиатором взяты из этого PDF. Разные ёмкости, задержки, RGB-версии и комплекты не подменяются соседними артикулами. Повтор уже представленного комплекта DDR5-6000 EXPO 64 ГБ исключён.

`sourceVerification` имеет значения `manufacturer-product-specification` для страниц CPU/плат и `manufacturer-datasheet` для отдельных PDF памяти. `sourceCheckedAt` фиксирует дату проверки. Ссылки на общую витрину и неработающие страницы не используются в этом модуле как подтверждённая спецификация.

## Границы точности

- `price` — условные цены в рублях. `score` — относительный игровой индекс модели, с Ryzen 7 7800X3D = 100; это не реальные бенчмарки.
- Поддержка Ryzen 8000/9000 на AM5 или новых Intel на LGA1700 подразумевает подходящую версию BIOS. Матрица конкретных версий BIOS здесь не воспроизводится.
- Для трёх B450-плат основной официальный лист предшествует последним BIOS. Поэтому `supportedCpuFamilies` намеренно не задан; `unknownSpecs` отмечает необходимость проверить CPU Support. Физический сокет AM4 сам по себе не гарантирует поддержку любого AM4-процессора.
- CPU Ryzen 8000G имеют более мощную встроенную графику, чем обычные AM5 CPU. Общая модель FPS встроенной графики в симуляторе упрощена и не показывает точную разницу между 740M/760M/780M.
- Профиль RAM с указанными MT/s и CL не гарантирует работу на такой скорости с любым CPU и числом DIMM. QVL, XMP/EXPO и устойчивость разгона проверяются отдельно.
- Для Intel гибридных CPU `baseClock` — базовая частота производительных P-ядер; полные раздельные характеристики E/P-ядер доступны по ссылке производителя.
- Высота памяти учитывает радиатор. Для башенного кулера с выступающим передним вентилятором высокая RAM может увеличить общую высоту охлаждения.

## Индивидуальные официальные источники

### Процессоры

| Модель / артикул | Источник |
| --- | --- |
| AMD Ryzen 7 5800X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-7-5800x.html) |
| AMD Ryzen 7 5800X3D | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-7-5800x3d.html) |
| AMD Ryzen 9 5950X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-9-5950x.html) |
| AMD Ryzen 5 7600X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-5-7600x.html) |
| AMD Ryzen 7 7700 | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7700.html) |
| AMD Ryzen 9 7900 | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7900.html) |
| AMD Ryzen 9 7900X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7900x.html) |
| AMD Ryzen 9 7900X3D | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7900x3d.html) |
| AMD Ryzen 9 7950X3D | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7950x3d.html) |
| AMD Ryzen 5 8500G | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/8000-series/amd-ryzen-5-8500g.html) |
| AMD Ryzen 5 8600G | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/8000-series/amd-ryzen-5-8600g.html) |
| AMD Ryzen 7 8700G | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/8000-series/amd-ryzen-7-8700g.html) |
| AMD Ryzen 5 9600X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-5-9600x.html) |
| AMD Ryzen 7 9700X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9700x.html) |
| AMD Ryzen 9 9900X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9900x.html) |
| AMD Ryzen 9 9950X | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x.html) |
| AMD Ryzen 7 9800X3D | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html) |
| AMD Ryzen 9 9950X3D | [Официальная спецификация](https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x3d.html) |
| Intel Core i3-12100 | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134584/intel-core-i312100-processor-12m-cache-up-to-4-30-ghz/specifications.html) |
| Intel Core i3-12100F | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/132223/intel-core-i312100f-processor-12m-cache-up-to-4-30-ghz/specifications.html) |
| Intel Core i5-12400 | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134586/intel-core-i512400-processor-18m-cache-up-to-4-40-ghz/specifications.html) |
| Intel Core i5-12500 | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/96144/intel-core-i512500-processor-18m-cache-up-to-4-60-ghz/specifications.html) |
| Intel Core i5-12600K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134589/intel-core-i512600k-processor-20m-cache-up-to-4-90-ghz/specifications.html) |
| Intel Core i5-12600KF | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134590/intel-core-i512600kf-processor-20m-cache-up-to-4-90-ghz/specifications.html) |
| Intel Core i7-12700K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134594/intel-core-i712700k-processor-25m-cache-up-to-5-00-ghz/specifications.html) |
| Intel Core i7-12700KF | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134595/intel-core-i712700kf-processor-25m-cache-up-to-5-00-ghz/specifications.html) |
| Intel Core i9-12900K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134599/intel-core-i912900k-processor-30m-cache-up-to-5-20-ghz/specifications.html) |
| Intel Core i9-12900KF | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/134600/intel-core-i912900kf-processor-30m-cache-up-to-5-20-ghz/specifications.html) |
| Intel Core i7-13700K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/230500/intel-core-i713700k-processor-30m-cache-up-to-5-40-ghz/specifications.html) |
| Intel Core i9-13900K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/230496/intel-core-i913900k-processor-36m-cache-up-to-5-80-ghz/specifications.html) |
| Intel Core i5-14600K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/236799/intel-core-i5-processor-14600k-24m-cache-up-to-5-30-ghz/specifications.html) |
| Intel Core i9-14900K | [Официальная спецификация](https://www.intel.com/content/www/us/en/products/sku/236773/intel-core-i9-processor-14900k-36m-cache-up-to-6-00-ghz/specifications.html) |

### Материнские платы

| Модель / артикул | Источник |
| --- | --- |
| MSI MAG B550 TOMAHAWK | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B550-TOMAHAWK/Specification) |
| MSI MAG B550M MORTAR | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B550M-MORTAR/Specification) |
| MSI MAG B550M MORTAR WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B550M-MORTAR-WIFI/Specification) |
| MSI MPG B550 GAMING PLUS | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-B550-GAMING-PLUS/Specification) |
| MSI MPG B550 GAMING EDGE WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-B550-GAMING-EDGE-WIFI/Specification) |
| MSI MPG B550 GAMING CARBON WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-B550-GAMING-CARBON-WIFI/Specification) |
| MSI MAG B550 TOMAHAWK MAX WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B550-TOMAHAWK-MAX-WIFI/Specification) |
| MSI B550 GAMING GEN3 | [Официальная спецификация](https://www.msi.com/Motherboard/B550-GAMING-GEN3/Specification) |
| MSI B450 TOMAHAWK MAX II | [Официальная спецификация](https://www.msi.com/Motherboard/B450-TOMAHAWK-MAX-II/Specification) |
| MSI B450M PRO VDH MAX | [Официальная спецификация](https://www.msi.com/Motherboard/B450M-PRO-VDH-MAX/Specification) |
| MSI B450 GAMING PLUS MAX | [Официальная спецификация](https://www.msi.com/Motherboard/B450-GAMING-PLUS-MAX/Specification) |
| MSI A520M A PRO | [Официальная спецификация](https://www.msi.com/Motherboard/A520M-A-PRO/Specification) |
| MSI A520M PRO | [Официальная спецификация](https://www.msi.com/Motherboard/A520M-PRO/Specification) |
| MSI MAG B650 TOMAHAWK WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B650-TOMAHAWK-WIFI/Specification) |
| MSI MAG B650M MORTAR WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B650M-MORTAR-WIFI/Specification) |
| MSI MPG B650 EDGE WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-B650-EDGE-WIFI/Specification) |
| MSI MPG B650I EDGE WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-B650I-EDGE-WIFI/Specification) |
| MSI PRO B650-P WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-B650-P-WIFI/Specification) |
| MSI PRO B650-S WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-B650-S-WIFI/Specification) |
| MSI B650M GAMING PLUS WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/B650M-GAMING-PLUS-WIFI/Specification) |
| MSI MAG X670E TOMAHAWK WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-X670E-TOMAHAWK-WIFI/Specification) |
| MSI MPG X670E CARBON WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-X670E-CARBON-WIFI/Specification) |
| MSI X670E GAMING PLUS WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/X670E-GAMING-PLUS-WIFI/Specification) |
| MSI PRO X670-P WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-X670-P-WIFI/Specification) |
| MSI PRO B660M-A DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-B660M-A-DDR4/Specification) |
| MSI PRO B660-A DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-B660-A-DDR4/Specification) |
| MSI MAG B660 TOMAHAWK WIFI DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B660-TOMAHAWK-WIFI-DDR4/Specification) |
| MSI MAG B660M MORTAR WIFI DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B660M-MORTAR-WIFI-DDR4/Specification) |
| MSI PRO H610M-G DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-H610M-G-DDR4/Specification) |
| MSI MAG B760 TOMAHAWK WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B760-TOMAHAWK-WIFI/Specification) |
| MSI MAG B760 TOMAHAWK WIFI DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B760-TOMAHAWK-WIFI-DDR4/Specification) |
| MSI MAG B760M MORTAR WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B760M-MORTAR-WIFI/Specification) |
| MSI MAG B760M MORTAR WIFI DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-B760M-MORTAR-WIFI-DDR4/Specification) |
| MSI PRO B760M-A WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-B760M-A-WIFI/Specification) |
| MSI PRO B760M-A WIFI DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-B760M-A-WIFI-DDR4/Specification) |
| MSI PRO Z790-A WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-Z790-A-WIFI/Specification) |
| MSI PRO Z790-P WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-Z790-P-WIFI/Specification) |
| MSI MPG Z790 EDGE WIFI | [Официальная спецификация](https://www.msi.com/Motherboard/MPG-Z790-EDGE-WIFI/Specification) |
| MSI MAG Z690 TOMAHAWK WIFI DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/MAG-Z690-TOMAHAWK-WIFI-DDR4/Specification) |
| MSI PRO Z690-A DDR4 | [Официальная спецификация](https://www.msi.com/Motherboard/PRO-Z690-A-DDR4/Specification) |

### Оперативная память

| Модель / артикул | Источник |
| --- | --- |
| Kingston FURY Beast RGB 16 ГБ (2×8) DDR4-3200 CL16 · KF432C16BBAK2/16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16BBAK2_16.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR4-3200 CL16 · KF432C16BBAK2/32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16BBAK2_32.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR4-3600 CL18 · KF436C18BBAK2/32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF436C18BBAK2_32.pdf) |
| Kingston FURY Beast RGB 64 ГБ (2×32) DDR4-3200 CL16 · KF432C16BBAK2/64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16BBAK2_64.pdf) |
| Kingston FURY Beast RGB 64 ГБ (2×32) DDR4-3600 CL18 · KF436C18BBAK2/64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF436C18BBAK2_64.pdf) |
| Kingston FURY Beast 8 ГБ (1×8) DDR4-3200 CL16 · KF432C16BB/8 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16BB_8.pdf) |
| Kingston FURY Beast 16 ГБ (1×16) DDR4-3200 CL16 · KF432C16BB/16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16BB_16.pdf) |
| Kingston FURY Beast 32 ГБ (1×32) DDR4-3200 CL16 · KF432C16BB/32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16BB_32.pdf) |
| Kingston FURY Beast 16 ГБ (2×8) DDR4-2666 CL16 · KF426C16BBK2/16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF426C16BBK2_16.pdf) |
| Kingston FURY Beast 32 ГБ (2×16) DDR4-2666 CL16 · KF426C16BBK2/32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF426C16BBK2_32.pdf) |
| Kingston FURY Renegade 32 ГБ (2×16) DDR4-3600 CL16 · KF436C16RB1K2/32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF436C16RB1K2_32.pdf) |
| Kingston FURY Renegade 16 ГБ (2×8) DDR4-3600 CL16 · KF436C16RBK2/16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF436C16RBK2_16.pdf) |
| Kingston FURY Renegade 16 ГБ (2×8) DDR4-3200 CL16 · KF432C16RBK2/16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF432C16RBK2_16.pdf) |
| Kingston FURY Renegade 32 ГБ (2×16) DDR4-4000 CL19 · KF440C19RB1K2/32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF440C19RB1K2_32.pdf) |
| Kingston FURY Renegade 16 ГБ (2×8) DDR4-4000 CL19 · KF440C19RBK2/16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF440C19RBK2_16.pdf) |
| Kingston FURY Renegade 32 ГБ (2×16) DDR5-6000 CL32 · KF560C32RSK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C32RSK2-32.pdf) |
| Kingston FURY Renegade 32 ГБ (2×16) DDR5-6400 CL32 · KF564C32RSK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF564C32RSK2-32.pdf) |
| Kingston FURY Renegade 32 ГБ (2×16) DDR5-6800 CL36 · KF568C36RSK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF568C36RSK2-32.pdf) |
| Kingston FURY Renegade 32 ГБ (2×16) DDR5-7200 CL38 · KF572C38RSK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF572C38RSK2-32.pdf) |
| Kingston FURY Renegade 64 ГБ (2×32) DDR5-6000 CL32 · KF560C32RSK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C32RSK2-64.pdf) |
| Kingston FURY Renegade 64 ГБ (2×32) DDR5-6400 CL32 · KF564C32RSK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF564C32RSK2-64.pdf) |
| Kingston FURY Renegade 48 ГБ (2×24) DDR5-7200 CL38 · KF572C38RSK2-48 | [Официальная спецификация](https://www.kingston.com/datasheets/KF572C38RSK2-48.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR5-6000 CL36 · KF560C36BBEAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C36BBEAK2-32.pdf) |
| Kingston FURY Beast 32 ГБ (2×16) DDR5-6000 CL30 · KF560C30BBEK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C30BBEK2-32.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR5-6000 CL30 · KF560C30BBEAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C30BBEAK2-32.pdf) |
| Kingston FURY Beast RGB 64 ГБ (2×32) DDR5-6000 CL36 · KF560C36BBEAK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C36BBEAK2-64.pdf) |
| Kingston FURY Beast 64 ГБ (2×32) DDR5-6000 CL30 · KF560C30BBEK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C30BBEK2-64.pdf) |
| Kingston FURY Beast RGB 64 ГБ (2×32) DDR5-6000 CL30 · KF560C30BBEAK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C30BBEAK2-64.pdf) |
| Kingston FURY Beast 16 ГБ (2×8) DDR5-5200 CL40 · KF552C40BBK2-16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF552C40BBK2-16.pdf) |
| Kingston FURY Beast 64 ГБ (2×32) DDR5-5200 CL40 · KF552C40BBK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF552C40BBK2-64.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR5-5200 CL40 · KF552C40BBAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF552C40BBAK2-32.pdf) |
| Kingston FURY Beast RGB 64 ГБ (2×32) DDR5-5200 CL40 · KF552C40BBAK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF552C40BBAK2-64.pdf) |
| Kingston FURY Beast 32 ГБ (2×16) DDR5-5600 CL40 · KF556C40BBK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF556C40BBK2-32.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR5-5600 CL40 · KF556C40BBAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF556C40BBAK2-32.pdf) |
| Kingston FURY Beast 64 ГБ (2×32) DDR5-5600 CL40 · KF556C40BBK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF556C40BBK2-64.pdf) |
| Kingston FURY Beast 32 ГБ (2×16) DDR5-6000 CL40 · KF560C40BBK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C40BBK2-32.pdf) |
| Kingston FURY Beast RGB 32 ГБ (2×16) DDR5-6000 CL40 · KF560C40BBAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C40BBAK2-32.pdf) |
| Kingston FURY Beast 32 ГБ (2×16) DDR5-4800 CL38 · KF548C38BBK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF548C38BBK2-32.pdf) |
| Kingston FURY Beast 16 ГБ (2×8) DDR5-4800 CL38 · KF548C38BBK2-16 | [Официальная спецификация](https://www.kingston.com/datasheets/KF548C38BBK2-16.pdf) |
| Kingston FURY Beast 64 ГБ (2×32) DDR5-4800 CL38 · KF548C38BBK2-64 | [Официальная спецификация](https://www.kingston.com/datasheets/KF548C38BBK2-64.pdf) |
| Kingston FURY Renegade RGB 32 ГБ (2×16) DDR5-6400 CL32 · KF564C32RSAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF564C32RSAK2-32.pdf) |
| Kingston FURY Renegade RGB 32 ГБ (2×16) DDR5-6800 CL36 · KF568C36RSAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF568C36RSAK2-32.pdf) |
| Kingston FURY Renegade RGB 32 ГБ (2×16) DDR5-7200 CL38 · KF572C38RSAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF572C38RSAK2-32.pdf) |
| Kingston FURY Renegade RGB 32 ГБ (2×16) DDR5-6000 CL32 · KF560C32RSAK2-32 | [Официальная спецификация](https://www.kingston.com/datasheets/KF560C32RSAK2-32.pdf) |
| Kingston FURY Renegade RGB 48 ГБ (2×24) DDR5-7200 CL38 · KF572C38RSAK2-48 | [Официальная спецификация](https://www.kingston.com/datasheets/KF572C38RSAK2-48.pdf) |
