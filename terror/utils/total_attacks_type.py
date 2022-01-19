# Counting attacks per type: international, domestic, unknown in a country
import pandas as pd
from pandas import DataFrame

data = pd.read_csv("YOUR_CSV_FILE_PATH", low_memory=False).fillna(0)
#Create the dataframe with columns that we need
df = DataFrame(data, columns = ["country_txt", "INT_LOG"])
# Replacing numbers with definitions
df[["INT_LOG"]] = df[["INT_LOG"]].replace([-9, 1, 0], ["unknown", "international", "domestic"])
# Grouping the data by country and type of attack
df_group = df.groupby(["country_txt", "INT_LOG"])
#Creating the dataframe from the grouped data
df_count = DataFrame({"Number of attacks": df_group.size()}).reset_index()
# Renameing the column name
df_count.rename(columns={"INT_LOG": "index"}, inplace=True)
# Pivoting the data. Values become column headers, number of attacks fill the values
attack_type_count = df_count.pivot(index = "country_txt", columns="index", values = "Number of attacks").fillna(0).reset_index()
#Setting to integers from floating numbers
attack_type_count[["domestic","international", "unknown"]]=attack_type_count[["domestic", "international", "unknown"]].astype(int)
# Saving the results to a csv file
attack_type_count.to_csv("OUTPUT_CSV_FILE_PATH")
