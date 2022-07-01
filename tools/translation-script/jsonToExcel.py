import json
import os
import pandas as pd
from googletrans import Translator

translator = Translator()

dirname = os.path.dirname(__file__)


def loop_object(base_key, lang_data):
    for key, value in lang_data.items():
        key = f"{base_key}{'.' if base_key != '' else ''}{key}"
        if type(value) is dict:
            loop_object(key, value)

        elif type(value) is str:
            key_translations = [value]
            for lang_code in langs:
                if lang_code == PrimaryLanguage:
                    continue

                lang_translation = ""
                lang_object = data_by_lang[lang_code]
                steps = key.split('.')
                for step in steps:
                    if step in lang_object:
                        lang_object = lang_object[step]
                    else:
                        break
                if type(lang_object) is str:
                    lang_translation = lang_object
                key_translations.append(lang_translation)

            output.append([key] + key_translations)


PrimaryLanguage = "en"
input_dir = "./"
output_file = 'output/translations.xlsx'
name = 'translations.xlsx'
translateTo = 'en,fr,it,es,pt,sw,ar'

cwd = os.getcwd()
os.chdir(input_dir)
files = os.listdir('.')
locales = translateTo.split(',')
validFiles = []
for locale in locales:
    if f"{locale}.json" in files:
        validFiles.append(f"{locale}.json")
        files = validFiles

langs = ["en", "fr", "it", "es", 'pt', 'sw', 'ar']

output = []
data_by_lang = {}

for lang in langs:
    inFile = open(f'{dirname}/en.json', 'r')
    json_data = inFile.read()

    data_by_lang[lang] = json.loads(json_data)
    inFile.close()

base_data = data_by_lang[PrimaryLanguage]


def loop_object(base_key, lang_data):
    for key, value in lang_data.items():
        key = f"{base_key}{'.' if base_key != '' else ''}{key}"
        if type(value) is dict:
            loop_object(key, value)

        elif type(value) is str:
            key_translations = []
            for lang_code in langs:
                lang_translation = ""
                lang_object = data_by_lang[lang_code]
                steps = key.split('.')
                for step in steps:
                    if step in lang_object:
                        lang_object = lang_object[step]
                    else:
                        break
                if type(lang_object) is str:
                    lang_translation = lang_object
                if lang_code != "en" and lang_translation:
                    print(lang_code)
                    translated = translator.translate(lang_translation, src="en", dest=lang_code)
                    lang_translation = translated.text
                key_translations.append(lang_translation)

            output.append([key] + key_translations)


loop_object("", base_data)

df = pd.DataFrame(output, columns=(['key', ] + langs))
writer = pd.ExcelWriter(output_file, engine='xlsxwriter')
df.to_excel(writer, index=False, sheet_name=name)

worksheet = writer.sheets[name]
workbook = writer.book

locked_format = workbook.add_format()
locked_format.set_locked(True)

unlocked_format = workbook.add_format()
unlocked_format.set_locked(False)

worksheet.set_column('A:B', None, locked_format)

worksheet.set_column('B:AB', None, unlocked_format)

# worksheet.protect()

worksheet.set_column('A:B', None, locked_format)

defaultFormat = workbook.add_format({'text_wrap': True})

for idx, col in enumerate(df):
    worksheet.set_column(idx, idx, 50, defaultFormat)

headerFormat = workbook.add_format(
    {'text_wrap': True, 'fg_color': '#DDDDDD', 'border_color': '#333333', 'border': 1, 'align': 'center',
     'valign': 'middle', 'bold': True})
worksheet.set_row(0, 20, headerFormat)

keyFormat = workbook.add_format({'text_wrap': True, 'fg_color': '#EEEEEE', 'border_color': '#AAAAAA', 'border': 1})
worksheet.set_column('A:A', 30, keyFormat)

interval = f"B1:{chr(65 + len(langs))}{len(output)}"
missingFormat = workbook.add_format({'text_wrap': True, 'bg_color': '#FFF8DC', 'border_color': '#CCCCCC', 'border': 1})
worksheet.conditional_format(interval, {
    'type': 'cell',
    'criteria': '==',
    'value': '""',
    'format': missingFormat
})

worksheet.freeze_panes(1, 1)
writer.save()
