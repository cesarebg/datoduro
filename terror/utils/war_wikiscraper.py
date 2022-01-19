import requests
from bs4 import BeautifulSoup as BS
import csv

war_data_url = "https://en.m.wikipedia.org/wiki/Category:Lists_of_wars_by_date"

war_data_page = requests.get(war_data_url).text

soup = BS(war_data_page, "html.parser")

data_list = soup.find_all("div", class_="mw-category-group")

data_list = data_list[1]

data_links = data_list.find_all("a")

base = "https://en.m.wikipedia.org"
war_links = []
for link in data_links[5:]:
    content = base + link.get("href")
    war_links.append(content)

with open("war_data.csv", "w") as war_data:

    fields = ["Start", "Finish", "Conflict", "Victorious party", "Defeated party"]
    writer = csv.DictWriter(war_data, fields)
    writer.writeheader()

    for page in war_links:
        table_page = requests.get(page).text
        soup = BS(table_page, "html.parser")
        table = soup.find_all("table", class_="wikitable")
        for tables in table:
            for row in tables.find_all("tr")[2:]:
                table_data = {
                    "Start": [],
                    "Finish": [],
                    "Conflict": [],
                    "Victorious party": [],
                    "Defeated party": []
                }
                cells = row.find_all("td")
                if len(cells) == 5:
                    try:

                        start = cells[0]
                        for year in start:
                            table_data["Start"].append(year)

                        finish = cells[1]
                        for year in finish:
                            table_data["Finish"].append(year)

                        conflict_name = cells[2].find_all("a")
                        for name in conflict_name:
                            name = name.get("title")
                            table_data["Conflict"].append(name)

                        vic_party = cells[3].find_all(("a"))
                        for country in vic_party:
                            try:
                                name = country.get("title")
                                if name is not None:
                                    table_data["Victorious party"].append(name)
                            except(AttributeError):
                                pass

                        def_party = cells[4].find_all("a")
                        for country in def_party:
                            try:
                                name = country.get("title")
                                if name is not None:
                                    table_data["Defeated party"].append(name)
                            except(AttributeError):
                                pass
                    except(IndexError):
                        pass

                try:
                    row = {"Start": table_data["Start"][0], "Finish": table_data["Finish"][0], "Conflict": table_data["Conflict"][0]}
                    if table_data["Victorious party"]:
                        row["Victorious party"] = ", ".join(table_data["Victorious party"])
                    if table_data["Defeated party"]:
                        row["Defeated party"] = ", ".join(table_data["Defeated party"])
                    writer.writerow(row)

                except(IndexError):
                    pass
