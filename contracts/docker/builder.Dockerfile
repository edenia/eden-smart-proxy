FROM --platform=linux/amd64 ubuntu:focal

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get update \
    && apt-get install -yq    \
    binaryen                \
    build-essential         \
    cmake                   \
    gdb                     \
    git                     \
    libboost-all-dev        \
    libcurl4-openssl-dev    \
    libgmp-dev              \
    libssl-dev              \
    libusb-1.0-0-dev        \
    pkg-config              \
    wget

ENV WASI_SDK_PREFIX=/root/work/wasi-sdk-12.0
ENV CLSDK_PREFIX=/root/work/clsdk

RUN mkdir /root/work && cd /root/work \
    && wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-12/wasi-sdk-12.0-linux.tar.gz \
    && tar xf wasi-sdk-12.0-linux.tar.gz \
    && wget https://github.com/eoscommunity/Eden/releases/download/sdk-v0.2.0-alpha/clsdk-ubuntu-20-04.tar.gz \
    && tar xf clsdk-ubuntu-20-04.tar.gz \
    && rm *.tar.*

ENV PATH=$CLSDK_PREFIX/bin:$PATH

COPY ./ ./

RUN mkdir -p build \
    && cd build \
    && cmake `clsdk-cmake-args` .. \
    && make -j $(nproc) \
    && cltester -v tests.wasm
