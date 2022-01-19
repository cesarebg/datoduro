import csv
import pandas as pd
import json
import geojson

columns_use = ["iyear", "imonth", "iday", "country_txt", "region_txt", "provstate",
              "city", "latitude", "longitude", "vicinity", "location",
              "crit1", "crit2", "crit3", "doubtterr", "alternative", "alternative_txt",
              "multiple", "success", "suicide", "attacktype1_txt", "targtype1_txt",
              "targsubtype1_txt", "corp1", "target1", "natlty1", "natlty1_txt", "gname",
              "ingroup", "motive", "guncertain1", "nperps", "nperpcap", "claimed", "claimmode",
              "claimmode_txt", "compclaim", "weaptype1", "weaptype1_txt", "weapsubtype4", "weapdetail",
              "nkill", "nkillus", "nkillter", "nwound", "nwoundus", "nwoundte", "property",
              "propextent", "propextent_txt", "propvalue", "ishostkid", "nhostkid", "nhostkidus",
              "nhours", "divert", "kidhijcountry", "ransom", "ransomamt", "ransomamtus",
              "ransompaid", "ransompaidus", "ransomnote", "hostkidoutcome", "hostkidoutcome_txt", "nreleased",
              "addnotes", "INT_LOG", "INT_IDEO", "INT_MISC", "INT_ANY"]

columns_use2 = ["id", "city", "country_txt", "Injured", "Killed", "Number of attacks", "latitude", "longitude"]
columns_use3 = ["id", "country_txt", "Injured", "Killed", "Number of attacks", "latitude", "longitude"]
columns_use4 = ["id","country_txt","domestic","international","unknown","latitude","longitude"]

# http://geoffboeing.com/2015/10/exporting-python-data-geojson/
# Loading the csv file that we want to geocode
data = pd.read_csv("../templates/terror/geocoded_94_15.csv", low_memory=False).fillna(0)


def df_to_geojson(data, properties, lat="latitude", lon="longitude"):
    geojson = {"type":"FeatureCollection", "features":[]}
    for _, row in data.iterrows():
        feature = {"type":"Feature",
                   "properties":{},
                   "geometry":{"type":"Point",
                               "coordinates":[]}}
        feature["geometry"]["coordinates"] = [row[lon],row[lat]]
        for prop in properties:
            feature["properties"][prop] = row[prop]
        geojson["features"].append(feature)
    return geojson

geojson = df_to_geojson(data, columns_use4)
output_filename = '../static/newsapp/type_94_15.js'
with open(output_filename, 'w') as output_file:
    output_file.write
    json.dump(geojson, output_file)
