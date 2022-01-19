from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader, Context
import csv
import pandas as pd
from pandas import Series, DataFrame
import numpy as np
import json
import geojson
from .forms import locationselect

data = pd.read_csv("terror/templates/terror/data_94_15_us_we_asia.csv", low_memory=False).fillna(0)
data2 = pd.read_csv("terror/templates/terror/data_94_15_we_us.csv", low_memory=False).fillna(0)
data_aid = pd.read_csv("terror/templates/terror/DP_LIVE_G7.csv")
war_data = pd.read_csv("terror/templates/terror/wars.csv", low_memory=False)
filename = "terror/static/newsapp/dataset.js"
filename2 = "terror/static/newsapp/dataset_cities.js"
filename3 = "terror/static/newsapp/dataset_country.js"
filename4 = "terror/static/newsapp/type_70_94.js"
filename5 = "terror/static/newsapp/type_94_15.js"


#Reading the geojson files
def geojson_data():
    with open(filename, "r") as geojson_data:
        return geojson_data.read().replace("'", "\\'")

def geojson_total_city():
    with open(filename2, "r") as total_city:
        return total_city.read().replace("'", "\\'")

def geojson_total_country():
    with open(filename3, "r") as total_city:
        return total_city.read().replace("'", "\\'")

def geojson_type_old():
    with open(filename4, "r") as total_type:
        return total_type.read().replace("'", "\\'")

def geojson_type_new():
    with open(filename5, "r") as total_type:
        return total_type.read().replace("'", "\\'")

#Counting total attacks per region
def attacks_region():
    #Create the dataframe with columns. We want to count the number of attacks in a region per year, the number of victims and injured people
    data_region = DataFrame(data, columns = ["region_txt", "iyear", "nkill", "nwound"])
    #Setting to integers from floating numbers
    data_region.nwound = data_region.nwound.astype(int)
    data_region.nkill = data_region.nkill.astype(int)
    #Grouping the data based on region and year
    region_group = data_region.groupby(["region_txt","iyear"])
    #Creating the dataframe from the grouped data
    region_count = DataFrame({"Number of attacks": region_group.size(), "Killed" : region_group.nkill.sum(), "Injured": region_group.nwound.sum()}).reset_index()
    #Replacing the value of the region with the name of the country as we have only one country in that region
    region_count[["region_txt"]] = region_count[["region_txt"]].replace(['North America'], ['United States'])
    #Creating a json string to be parsed into the html
    region=region_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return region

#Counting total attacks per region
def attacks_country():
    #Create the dataframe with columns. We want to count the number of attacks in a country per year, the number of victims and injured people
    data_country = DataFrame(data, columns = ["country_txt", "iyear", "nkill", "nwound"])
    #Setting to integers from floating numbers
    data_country.nwound = data_country.nwound.astype(int)
    data_country.nkill = data_country.nkill.astype(int)
    #Grouping the data based on country and year
    country_group = data_country.groupby(["country_txt","iyear"])
    #Creating the dataframe from the grouped data
    country_count = DataFrame({"Number of attacks": country_group.size(), "Killed": country_group.nkill.sum(), "Injured": country_group.nwound.sum()}).reset_index()
    #Creating a json string to be parsed into the html
    country = country_count.reset_index().to_json(orient='index')
    return country

#Counting total attacks for a terrorist group per region
def groups_region():
    #Create the dataframe with columns. We want to count the number of attacks that a group commited in a region, the number of victims and injured people
    data_groups = DataFrame(data, columns = ["region_txt", "gname", "nkill", "nwound"])
    #Setting to integers from floating numbers
    data_groups.nwound = data_groups.nwound.astype(int)
    data_groups.nkill = data_groups.nkill.astype(int)
    #Grouping the data based on the region and terrorist group
    terror_groups = data_groups.groupby(["region_txt","gname"])
    #Creating the dataframe from the grouped data
    groups_count = DataFrame({"Number of attacks by terror group": terror_groups.size(), "Killed": terror_groups.nkill.sum(), "Injured": terror_groups.nwound.sum()}).reset_index()
    #Replacing the value of the region with the name of the country as we have only one country in that region
    groups_count[["region_txt"]] = groups_count[["region_txt"]].replace(['North America'], ['United States'])
    #Creating a json string to be parsed into the html
    groups_region = groups_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return groups_region

#Counting total attacks for a terrorist group per country
def groups_country():
    #Create the dataframe with columns. We want to count the number of attacks that a group commited in a country, the number of victims and injured people
    data_groups = DataFrame(data, columns = ["country_txt", "gname", "nkill", "nwound"])
    #Setting to integers from floating numbers
    data_groups.nwound = data_groups.nwound.astype(int)
    data_groups.nkill = data_groups.nkill.astype(int)
    #Grouping the data based on the country and terrorist group
    terror_groups = data_groups.groupby(["country_txt","gname"])
    #Creating the dataframe from the grouped data
    groups_count = DataFrame({"Number of attacks by terror group": terror_groups.size(), "Killed": terror_groups.nkill.sum(), "Injured": terror_groups.nwound.sum()}).reset_index()    # groups_countr = groups_count.fillna(0)
    #Creating a json string to be parsed into the html
    groups_country = groups_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return groups_country

# Creating data for wars
def wars():
    #Dataframe with chosen columns
    data_conflict = DataFrame(war_data, columns = ["War", "Location", "StartDate"])
    # Changing the type of values to date
    data_conflict["StartDate"] = pd.to_datetime(data_conflict["StartDate"])
    # Creating a new column that holds only the year
    data_conflict["year"] = data_conflict["StartDate"].dt.year
    # Drop the initial date column as we are only interested into years, the column that we created
    data_conflict = data_conflict.drop("StartDate", 1).drop_duplicates( keep='last').reset_index()
    #Creating a json string to be parsed into the html
    wars = data_conflict.to_json(orient='index')
    return wars

#Counting total attacks per country
def total_country():
    #Create the dataframe with columns. We want to count the total number of attacks, victims and injured people in a country
    df = DataFrame(data2, columns = ["country_txt", "nkill", "nwound"])
    #Setting to integers from floating numbers
    df.nkill = df.nkill.astype(int)
    df.nwound = df.nwound.astype(int)
    #Grouping the data based on the country
    df_group = df.groupby("country_txt")
    #Creating the dataframe from the grouped data
    df_count = DataFrame({"Number of attacks": df_group.size(), "Killed" : df_group.nkill.sum(), "Injured": df_group.nwound.sum()}).reset_index()
    #Creating a json string to be parsed into the html
    total = df_count.to_json(orient="index")
    return total

#Counting total attacks per city
def total_city():
    #Create the dataframe with columns. We want to count the total number of attacks, victims and injured people in a city.
    df = DataFrame(data2, columns = ["city", "country_txt", "nkill", "nwound"])
    #Setting to integers from floating numbers
    df.nkill = df.nkill.astype(int)
    df.nwound = df.nwound.astype(int)
    #Grouping the data based on the country and city. It is important to group also by country, e.g. Birmingham is a city in the UK and also USA. That way we can keep them apart.
    df_group = df.groupby(["city", "country_txt"])
    #Creating the dataframe from the grouped data
    df_count = DataFrame({"Number of attacks": df_group.size(), "Killed" : df_group.nkill.sum(), "Injured": df_group.nwound.sum()}).reset_index()
    #Creating a json string to be parsed into the html
    total = df_count.to_json(orient="index").replace("'", "\\'")
    return total

def attacks_int():
    data_intl = DataFrame(data, columns = ["region_txt", "iyear", "nkill", "nwound", "gname", "INT_LOG", 'region'])
    data_intl.nwound = data_intl.nwound.astype(int)
    data_intl.nkill = data_intl.nkill.astype(int)
    intl_group = data_intl.groupby(["region_txt","iyear", "INT_LOG", 'region'])
    intl_count = DataFrame({"Number of attacks": intl_group.size(), "Killed" : intl_group.nkill.sum(), "Injured": intl_group.nwound.sum()}).reset_index()
    intl_count[["region_txt"]] = intl_count[["region_txt"]].replace(['North America'], ['United States'])
    intl_count = intl_count.query('iyear >= 2010')
    intl_count = intl_count.query('INT_LOG == 1')
    # intl_count = intl_count.query('region == 8 | region == 10')
    int_log = intl_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return int_log

def int_weste():
    data_intl = DataFrame(data, columns = ["region_txt", "iyear", "nkill", "nwound", "gname", "INT_LOG", 'region'])
    data_intl.nwound = data_intl.nwound.astype(int)
    data_intl.nkill = data_intl.nkill.astype(int)
    intl_group = data_intl.groupby(["region_txt","iyear", "INT_LOG", 'region'])
    intl_count = DataFrame({"Number of attacks": intl_group.size(), "Killed" : intl_group.nkill.sum(), "Injured": intl_group.nwound.sum()}).reset_index()
    intl_count[["region_txt"]] = intl_count[["region_txt"]].replace(['North America'], ['United States'])
    intl_count = intl_count.query('iyear >= 2010')
    intl_count = intl_count.query('region == 8')
    # intl_count = intl_count.query('region == 8 | region == 10')
    int_west = intl_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return int_west

def int_country():
    data_intl = DataFrame(data, columns = ["country_txt", "iyear", "nkill", "nwound", "gname", "INT_LOG"])
    data_intl.nwound = data_intl.nwound.astype(int)
    data_intl.nkill = data_intl.nkill.astype(int)
    intl_group = data_intl.groupby(["country_txt","iyear", "INT_LOG"])
    intl_count = DataFrame({"Number of attacks": intl_group.size(), "Killed" : intl_group.nkill.sum(), "Injured": intl_group.nwound.sum()}).reset_index()
    int_coun = intl_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return int_coun

def dash_fn():
    data_dash = DataFrame(data, columns = ["region_txt", "iyear", "nkill", "nwound", "gname", "INT_LOG", 'region'])
    data_dash.nwound = data_dash.nwound.astype(int)
    data_dash.nkill = data_dash.nkill.astype(int)
    dash_group = data_dash.groupby(["region_txt","iyear", "INT_LOG", 'region'])
    dash_count = DataFrame({"Number of attacks": dash_group.size(), "Killed" : dash_group.nkill.sum(), "Injured": dash_group.nwound.sum()}).reset_index()
    dash_count[["region_txt"]] = dash_count[["region_txt"]].replace(['North America'], ['United States'])
    dash_count = dash_count.query('iyear > 2001')
    dash_count = dash_count.query('INT_LOG == 1')
    dash_count = dash_count.query('region == 8 | region == 10')
    dash_info = dash_count.to_json(orient='records').replace("'", "\\'")
    return dash_info

def aid_fn():
    aid_countries = DataFrame(data_aid, columns = ["LOCATION", "TIME", "Value"])
    aid_countries.LOCATION = aid_countries.LOCATION.astype(str)
    aid_countries.TIME = aid_countries.TIME.astype(int)
    aid_countries.VALUE = aid_countries.Value.astype(int)
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['CAN'], ['Canada'])
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['FRA'], ['France'])
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['DEU'], ['Germany'])
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['ITA'], ['Italy'])
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['JPN'], ['Japan'])
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['GBR'], ['United Kingdom'])
    aid_countries[["LOCATION"]] = aid_countries[["LOCATION"]].replace(['USA'], ['United States'])
    aid_data = aid_countries.reset_index().to_json(orient='index').replace("'", "\\'")
    return aid_data

#Counting total attacks per region
def all_regions():
    #Create the dataframe with columns. We want to count the number of attacks in all regions per year, the number of victims and injured people
    data_region = DataFrame(data, columns = ["iyear", "nkill", "nwound"])
    #Setting to integers from floating numbers
    data_region.nwound = data_region.nwound.astype(int)
    data_region.nkill = data_region.nkill.astype(int)
    #Grouping the data based on year
    region_group = data_region.groupby(["iyear"])
    #Creating the dataframe from the grouped data
    region_count = DataFrame({"Region": "All Regions", "Number of attacks": region_group.size(), "Killed" : region_group.nkill.sum(), "Injured": region_group.nwound.sum()}).reset_index()
    #Creating a json string to be parsed into the html
    region = region_count.reset_index().to_json(orient='index').replace("'", "\\'")
    return region

# Loading the infromation into index.html
def index(request):
    template = loader.get_template('terror/index.html')
    att_region = attacks_region()
    att_country = attacks_country()
    group_region = groups_region()
    group_country = groups_country()
    geojson = geojson_data()
    wars_list = wars()
    total_cou = total_country()
    total_cit = total_city()
    geojson_city = geojson_total_city()
    geojson_country = geojson_total_country()
    att_intl = attacks_int()
    dash_var = dash_fn()
    aid_countries = aid_fn()
    int_west_e = int_weste()
    total_type_old = geojson_type_old()
    total_type_new = geojson_type_new()
    total_regions = all_regions()
    context = { 'att_reg': att_region,
                        'att_coun': att_country,
                        'group_region': group_region,
                        'group_country': group_country,
                        'geojson_data': geojson,
                        "total_country": total_cou,
                        "total_city": total_cit,
                        "geojson_city": geojson_city,
                        "att_int" : att_intl,
                        "dash_data" : dash_var,
                        "aid_count" : aid_countries,
                        "int_west_eur" : int_west_e,
                        "geojson_country": geojson_country,
                        "total_old": total_type_old,
                        "total_new": total_type_new,
                        "all_regions": total_regions
                        }
    return HttpResponse(template.render(context))

# Loading the infromation into results.html
def search(request):
    template = loader.get_template('terror/results.html')
    att_region = attacks_region()
    att_country = attacks_country()
    group_region = groups_region()
    group_country = groups_country()
    geojson = geojson_data()
    wars_list = wars()
    total_cou = total_country()
    total_cit = total_city()
    geojson_city = geojson_total_city()
    geojson_country = geojson_total_country()
    att_intl = attacks_int()
    dash_var = dash_fn()
    aid_countries = aid_fn()
    int_west_e = int_weste()
    total_type_old = geojson_type_old()
    total_type_new = geojson_type_new()
    count_int = int_country()
    context = { 'att_reg': att_region,
                        'att_coun': att_country,
                        'group_region': group_region,
                        'group_country': group_country,
                        'geojson_data': geojson,
                        'wars': wars_list,
                        "total_country": total_cou,
                        "total_city": total_cit,
                        "geojson_city": geojson_city,
                        "att_int" : att_intl,
                        "dash_data" : dash_var,
                        "aid_count" : aid_countries,
                        "int_west_eur" : int_west_e,
                        "geojson_country": geojson_country,
                        "total_old": total_type_old,
                        "total_new": total_type_new,
                        "int_dom_country" : count_int,
                        }
    return HttpResponse(template.render(context))

# Loading the infromation into detail.html
def detail(request):
    template2 = loader.get_template('terror/detail.html')
    geojson = geojson_data()
    wars_list = wars()
    total_cou = total_country()
    total_cit = total_city()
    geojson_city = geojson_total_city()
    geojson_country = geojson_total_country()
    total_type_old = geojson_type_old()
    total_type_new = geojson_type_new()
    context2 = {"total_country": total_cou,
                        "total_city": total_cit,
                        "geojson_city": geojson_city,
                        "geojson_country": geojson_country,
                        "total_old": total_type_old,
                        "total_new": total_type_new
                        }
    return HttpResponse(template2.render(context2))
