import os
import json
import pandas as pd

dirname = os.path.dirname(__file__)
file = os.path.join(dirname, 'output/translations.xlsx')

xl = pd.ExcelFile(file)
df = xl.parse().fillna('')
data = df.values.tolist()

languages = ["en", "fr", "it", "es", 'pt', 'sw', 'ar']


lang_translations = {}

for lang in languages:
    lang_translations[lang] = {}


for index, row in df.iterrows():
    key = row['key']

    steps = key.split('.')

    for lang in languages:
        lang_trans = lang_translations[lang]

        for idx, step in enumerate(steps):
            if step not in lang_trans and idx != len(steps)-1:
                lang_trans[step] = {}
                lang_trans = lang_trans[step]
            elif idx != len(steps)-1:
                lang_trans = lang_trans[step]

        if True or row[lang] != '':
            if not isinstance(lang_trans, str):
                lang_trans[steps[-1]] = row[lang].rstrip()

for lang in languages:
    out_file = open(f"{dirname}/output/{lang}.json", 'w')
    json.dump(lang_translations[lang], out_file, indent=4, ensure_ascii=False)
    out_file.close()



