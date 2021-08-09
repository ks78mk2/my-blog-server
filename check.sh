BASIC_PATH=/home/opc/my-blog-server-static
PACKAGE1=/home/opc/myblog-docker/my-blog-server/package.json
PACKAGE2=/home/opc/my-blog-server-static/package.json
STATIC_PATH=/home/opc/my-blog-server-static/

if [ ! -d "$BASIC_PATH" ]; then
        echo "THIS BASIC PATH NOT EXIST"
        mkdir -p $BASIC_PATH
        /home/opc/.nvm/versions/node/v10.15.3/bin/npm install &
        wait
        cp -r ./node_modules $STATIC_PATH &
        wait
        cp ./package.json $STATIC_PATH
else
        echo "THIS BASIC PATH EXIST"
        DIFF=$(diff $PACKAGE1 $PACKAGE2)
        if [ "$DIFF" == "" ]; then
                echo "same"
        else
                echo "not same"
                /home/opc/.nvm/versions/node/v10.15.3/bin/npm install &
                wait
                cp -r ./node_modules $STATIC_PATH &
                wait
                cp ./package.json $STATIC_PATH
        fi
fi