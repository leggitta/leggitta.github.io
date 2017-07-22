from bokeh.models import ColumnDataSource
from bokeh.plotting import figure, output_file, show
from IPython import embed
import numpy as np
import pandas as pd
import sys

output_file("datetime.html")

# read table of life events
event_table = pd.read_csv('life_events.csv', delimiter=';')
event_table['t0'] = event_table.start.apply(
    lambda x: pd.to_datetime(x).timestamp() * 1e3)
event_table['tf'] = event_table.end.apply(
    lambda x: pd.to_datetime(x).timestamp() * 1e3)
event_table['xs'] = event_table.apply(
    lambda x: [x.t0, x.tf, x.tf, x.t0], axis=1)
event_table['ys'] = event_table.row.apply(
    lambda x: [x, x, x + 0.9, x + 0.9])
event_table['text_x'] = event_table.apply(
    lambda x: np.mean([x.t0, x.tf]), axis=1)
event_table['text_y'] = event_table.row.apply(
    lambda x: x + 0.4)
src = ColumnDataSource(event_table)

# create a new plot with a datetime axis type
fig = figure(
    title='Timeline',
    plot_width=800, plot_height=250, x_axis_type="datetime",
    tools="hover", y_axis_location=None, toolbar_location=None)

fig.patches('xs', 'ys', source=src, fill_color='color', line_color='black')
fig.text(x='text_x', y='text_y', text='name', text_align='center', source=src)
fig.grid.grid_line_color = None

show(fig)

if len(sys.argv) > 1:
    embed()
