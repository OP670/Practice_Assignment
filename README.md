# Practice Assignment
A simple REST API that:
- reads the text file location form a config.json
- loads data from the text file (e.g. Eggplants_Galore.txt)
- responds to `GET /` with a greeting and instructions 
- responds to `GET /count?word=some_word` queries by returning the number of times *some_word* appears in each line
- response is structured as readable JSON formated as:
```
{
  "word": "some_word",
  "sentances":[
		{"sentance": "Some_words in a single line", "count": 1},
		...
  ]
}
```
- the sentances array is ordered in descending order of count
- in case of a tie, the sentances are odered in ascending aplhabetical order
- the search is case insensitive