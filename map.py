from bokeh.models import ColumnDataSource
from bokeh.plotting import figure, output_file, show
from bokeh.sampledata.us_states import data
import pandas as pd

X, Y = [], []

for k in data.keys():
    x = data[k]['lons']
    y = data[k]['lats']
    X.append(x)
    Y.append(y)


cities = [
    {'name': 'San Francisco', 'x': -122.4194, 'y': 37.7749},
    {'name': 'Anchorage', 'x': -149.9003, 'y': 61.2181},
    {'name': 'Fort Benning', 'x': -84.8229, 'y': 32.3913},
    {'name': 'Fort Bragg', 'x': -79.0080, 'y': 35.1415},
    {'name': 'Fort Polk', 'x': -93.2131, 'y': 31.0567},
    {'name': 'Dahlonega', 'x': -83.9844, 'y': 34.5261},
    {'name': 'Camp Rudder', 'x': -86.5533, 'y': 30.4636},
    {'name': 'Manorville', 'x': -72.8079, 'y': 40.8737}
]
src = ColumnDataSource(pd.DataFrame(cities))


output_file('map.html')
fig = figure(x_axis_location=None, y_axis_location=None)
fig.patches(X, Y, line_color='black', fill_color='white')
fig.grid.grid_line_color = None
fig.circle('x', 'y', source=src, color='red', radius=1)
show(fig)
