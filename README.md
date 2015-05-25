# ROBOCOPIER
[![Build Status](https://travis-ci.org/jampow/roboCopier.svg?branch=master)](https://travis-ci.org/llaraujo/roboCopier)

Este projeto tem a intenção de copiar pastas e arquivos de algum servidor remoto pra pasta do seu servidor local, sendo fácil de configurar e de usar.

rc sitea/index.htm
Copia o arquivo index.htm dentro de sitea

rc sitea/index*
Copia qualquer arquivo começado com index

rc sitea/index.htm -m
mount, copy and unmount

rc sitea/some/long/path/index.htm -r
copia index.htm se ele existir na pasta, se não volta nível a nível buscando o arquivo até encontrar ou até os paths acabarem

rc sitea/some/long/path/index.htm -rf
copia index.htm e volta nível a nível copiando todos os index.htm que encontrar até acabarem os níveis

rc configx
Copia uma lista pré-configurada. A lista é uma coleção de comandos como os acima descritos.
 
