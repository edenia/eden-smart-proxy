
mkdir -p build \
    && cd build \
    && cmake `clsdk-cmake-args` .. \
    && make -j $(nproc) && \
    # cltester -v tests.wasm && \
    cltester -v tests-proxyreward.wasm &&
    cd ..