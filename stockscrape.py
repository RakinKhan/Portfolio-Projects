import time as t
import requests
from bs4 import BeautifulSoup
from datetime import date, datetime, time


startDayTrade = datetime.combine(date.today(), time(9, 30, 0, 0))
endDayTrade = datetime.combine(date.today(), time(18, 0, 0, 0))
dayStart = datetime.combine(date.today(), time(0, 0, 0, 0))
dayEnd = datetime.combine(date.today(), time(23, 59, 59, 0))


def getPrice(ticker):
    res = requests.get(f'https://finance.yahoo.com/quote/{ticker}/')
    soup = BeautifulSoup(res.text, 'html.parser')

    values = soup.find_all(
        'div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find_all('span')
    price = ''
    change = ''
    time = ''
    for i in range(len(values)):
        if i == 0:
            price = values[i].text
        elif i == 1:
            change = values[i].text
        else:
            time = (values[i].text).replace('At close:  ', '')
    return print(f'the price of {ticker} is ${price} as of {time}. it is a ${change} change since the opening price.')


while True:
    if datetime.now() >= startDayTrade and datetime.now() <= endDayTrade:
        getPrice('MSFT')
        getPrice('FB')
        getPrice('TSLA')
        t.sleep(1)
        continue
    elif datetime.now() > dayStart and datetime.now() < startDayTrade:
        print(f'Sorry, market will open at {time(9, 30, 0, 0)}')
        t.sleep(5)
        continue
    elif datetime.now() > endDayTrade and datetime.now() < dayEnd:
        print(
            f'Sorry, market will open at {time(9, 30, 0, 0)} tomorrow morning')
        t.sleep(5)
        continue
