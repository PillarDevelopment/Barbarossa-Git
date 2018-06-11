![Иллюстрация к проекту](https://github.com/PillarDevelopment/Barbarossa-Git/blob/master/site/img/Снимок%20экрана%202018-06-11%20в%2011.21.09.png)

![Image alt](https://github.com/{username}/{repository}/raw/{branch}/{path}/image.png)

{username} — ваш ник на ГитХабе;
{repository} — репозиторий где хранятся картинки;
{branch} — ветка репозитория;
{path} — путь к месту нахождения картинки.



# Barbarossa Investing token


[ADDRESS IN ETHERSCAN.IO](https://etherscan.io/address/0x8491083a99F2c52Ffbc7ead44242680666bc4d1E)

[ABI INTERFACE](https://github.com/PillarDevelopment/Barbarossa-Git/blob/master/ABI.json)

[TOKEN HOLDERS](https://etherscan.io/TOKEN/0x8491083a99F2c52Ffbc7ead44242680666bc4d1E#balances)

[Source code](https://github.com/PillarDevelopment/Barbarossa-Git/blob/master/contracts/BarbarossaInvestToken.sol)



# Specification

Публичные поля:

`name` - Полное название токена;

`symbol` - 3(4) значный символ;

`decimals` - количество знаков после запятой;

`owner` - адрес владельца контракта;

`totalSupply` - общая эмиссия токенов, в wei;

`avaliableSupply` - количество токенов, доступных для покупки в wei;

`buyPrice` - цена покупки в wei;

`balanceOf` - бланас держателя токенов в wei;

`allowance` - хранит разрешенеие на использование токенов;

`startSellDate` - текущий этап распродажи;

`paused` - хранит на паузе или нет;

`Selling` - хранит структуру текущего этапа распродажи(от 1 до 4);

`weisRaised` - подсчет общего количества собраного эфира в wei;


Публичные методы:

`setPrices` - изменение цены токена в wei;

`startSelling` - запускает этап распродажи (4 этапа);

`transferTokensFromContract` - позволяет владельцу контракта переводит токены на выбранные адреса;

`transferEthFromContract` - выводит эфир с контракта;

`pause` - ставит операции с токеном на паузу;

`unpause` - снимает операции с контрактом с паузы;

`burn` - сжигает токены;

`burnFrom` - сжигает токены на выбранном адресе;

`transfer` - отправляет токены;

`transferFrom` - отправляет токены с выбранного адреса;

`approve` - разрешает использовать токены третьему лицу на твоем аккаунте;

`increaseApproval` - увеличивает лимит использования;

`decreaseApproval` - уменьшает лимит использования;

`transferOwnership` - позволяет изменить владельца контракта;


# Инструкция по использованию.

1) После деплоя контракта для изменения этапа распродаж необходимо вызвать фунцию startSelling, куда в качестве аргументов передать количество токенов для этапа(целое число), дату начала в unix, дату окончания в unix, скидку целым числом(0 если нет);

[конвертер в unix time - unixtimestamp](https://www.unixtimestamp.com/index.php);

[конвертор в wei - etherconverter](https://etherconverter.online/);

2) для изменения цены токена необходимо вызвать фунцию setPrice куда в качестве аргумента передать новую цену в wei;

3) для снятия операций с токенами с паузы необходимо вызвать функцию unpause без аргумента;

4) для администрирования контракта необходимо перейти по ссылке https://wallet.ethereum.org/contracts  при активированном metamask и выбрать соответствующий контракт(предварительно вставить адрес и JSON интерфейс контракта).
