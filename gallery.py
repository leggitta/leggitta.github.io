from bokeh.models import FixedTicker
from bokeh.plotting import figure, output_file, show
import numpy as np

tau = 2 * np.pi
# tau = 360
N = 1000

fig = figure(width=600, height=300)

ticker = FixedTicker(ticks=[0, 0.5 * np.pi, np.pi, 1.5 * np.pi, 2 * np.pi])

x = np.linspace(0, tau, N)
sin_x = np.sin(x)
cos_x = np.cos(x)

for a in np.linspace(0, 1, 100):
    fig.line(
        x, a * cos_x, color='blue', line_width=2, legend='Cosine', alpha=a)
    fig.line(
        x, a * sin_x, color='red', line_width=2, legend='Sine', alpha=a)

fig.legend.location = 'bottom_left'
fig.xaxis.axis_label = 'Angle (Radians)'
fig.xaxis.ticker = ticker
fig.xgrid.ticker = ticker

output_file('gallery.html')
show(fig)
