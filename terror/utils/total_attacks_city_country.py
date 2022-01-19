#Counting total attacks per country, city
import pandas as pd
from pandas import DataFrame

data = pd.read_csv("YOUR_CSV_FILE_PATH", low_memory=False).fillna(0)
#Create the dataframe with columns. We want to count the total number of attacks, victims and injured people in a country
df_country = DataFrame(data, columns = ["country_txt", "nkill", "nwound"])
#Setting to integers from floating numbers
df_country.nkill = df_country.nkill.astype(int)
df_country.nwound = df_country.nwound.astype(int)
#Grouping the data based on the country
df_group_country = df_country.groupby("country_txt")
#Creating the dataframe from the grouped data
df_count_country = DataFrame({"Number of attacks": df_group_country.size(), "Killed" : df_group_country.nkill.sum(), "Injured": df_group_country.nwound.sum()}).reset_index()
# Writing the values to a new csv file
total_country = df_count_country.to_csv("OUTPUT_CSV_FILE_PATH")

#Create the dataframe with columns. We want to count the total number of attacks, victims and injured people in a city.
df_city = DataFrame(data, columns = ["city", "country_txt", "nkill", "nwound"])
#Setting to integers from floating numbers
df_city.nkill = df_city.nkill.astype(int)
df_city.nwound = df_city.nwound.astype(int)
#Grouping the data based on the country and city. It is important to group also by country, e.g. Birmingham is a city in the UK and also USA. That way we can keep them apart.
df_group_city = df_city.groupby(["city", "country_txt"])
#Creating the dataframe from the grouped data
df_count_city = DataFrame({"Number of attacks": df_group_city.size(), "Killed" : df_group_city.nkill.sum(), "Injured": df_group_city.nwound.sum()}).reset_index()
# Writing the values to a new csv file 
total_city = df_count_city.to_csv("OUTPUT_CSV_FILE_PATH")
