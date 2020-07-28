```sh
for f in *.m4v
do
        echo "Requesting thumbnail image for - $f";
	imdb-title-image "$f";
done
```