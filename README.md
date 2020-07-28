# Install
`$ npm install --global imdb-title-image`

# Use

```sh
mkdir thumbs

for f in *
do
        echo "Requesting thumbnail image for - $f";
	imdb-title-image "$f";
done
```
