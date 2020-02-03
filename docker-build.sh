#!/usb/bin/sh

for c in server ui; do
    docker rmi -f ihris-$c:1.0-BETA
    cd $c
    echo "Building $c"
    docker build -t ihris-$c:1.0-BETA .
    if [ "$?" -ne "0" ]; then
        echo "Failed building image for $c"
        continue
    fi
    echo "Done"
    cd ..
done