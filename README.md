# krish
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
import kivy


kivy.require('1.9.0')


class Myroot(BoxLayout):

    def __int__(self):
        super(Myroot, self).__init__()

    def calc_symbol(self, symbol):
        self.calc_field.text += symbol

    def clear(self):
        self.calc_field.text = ""

    def get_result(self):
        self.calc_field.text = str(eval(self.calc_field.text))


class NeuralCalc(App):

    def build(self):
        return Myroot()
