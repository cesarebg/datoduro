#https://gist.github.com/rgdonohue/c4beedd3ca47d29aef01
#pip install geopy
from geopy.geocoders import ArcGIS, Bing, Nominatim, OpenCage, GeocoderDotUS, GoogleV3, OpenMapQuest
import csv, sys

#define geocoders
arcgis = ArcGIS(timeout=100)
nominatim = Nominatim(timeout=100)
geocoderDotUS = GeocoderDotUS(timeout=100)
googlev3 = GoogleV3(timeout=100)
openmapquest = OpenMapQuest(timeout=100)

#preference order for geocoders
geocoders = [googlev3, nominatim, geocoderDotUS, openmapquest]

def geocode(address):
    i = 0
    try:
        while i < len(geocoders):
            # try to geocode using a service
            location = geocoders[i].geocode(address)

            # if it returns a location
            if location != None:

                # return those values
                return [location.latitude, location.longitude]
            else:
                # otherwise try the next geocoder in the list
                i += 1
    except:
        # catch whatever errors, likely timeout, and return null values
        print (sys.exc_info()[0])
        return ["null","null"]

    # if all services have failed to geocode, return null values
    return ["null","null"]

# list to hold all rows
list_rows = []

with open("INSERT_CSV", mode="r",encoding="utf-8") as final:

    # read the csv file you want to geocode
    reader = csv.reader(final)
    j = 0
    # skip the headers
    next(final)
    for row in reader:
        print ("processing #",j)
        j+=1
        try:
            # use for cities only, locate the column containing city and country name
            city = row[1]
            country = row[2]
            address = city + " " + country
            result = geocode(address)

#           use for countries only
            country = row[1]
            result = geocode(country)

            # add the lat/lon values to the row
            row.extend(result)
            # add the new row to master list
            list_rows.append(row)

        except:
            print ("error")

# write results to file
with open("INSERT_FILE_NAME_CSV", "w", encoding="utf-8") as geocoded:
    # define column names
    fields = ["id", "country_txt", "Injured", "Killed", "Number of attacks", "latitude", "longitude"]
    # write column names to a csv file
    writer = csv.DictWriter(geocoded, fields)
    writer.writeheader()
    # write the csv file
    writer = csv.writer(geocoded)
    writer.writerows(list_rows)

print("Done!")
