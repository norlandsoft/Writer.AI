# -*- coding: utf-8 -*-
import sys
import uvicorn
import argparse
import threading
sys.path.append('../')


parser = argparse.ArgumentParser()
parser.add_argument('--platform-host', type=str, default='0.0.0.0')
parser.add_argument('--platform-port', type=int, default=8000)
parser.add_argument('--engine-host', type=str, default='127.0.0.1')
parser.add_argument('--engine-port', type=int, default=8080)


def reg_callback(param):
    print(param)


if __name__ == "__main__":
    from machine.config import EnvConfig
    from machine.web.server import app

    # 获取命令行参数
    args = parser.parse_args()
    EnvConfig.start_props_listening(args.platform_host, args.platform_port)

    from machine.utils.ZookeeperCient import ZookeeperClient

    zk_host = f"{args.platform_host}:2181"
    zk_connector = ZookeeperClient(zk_host)

    engine_service_path = f"/air/machine/engine/engine-{args.engine_host}"
    engine_service_data = '{"host":' + f'"{args.engine_host}",' + f'"port":{args.engine_port}' + '}'


    def reg_callback(data, stat):
        if not zk_connector.zk.exists(engine_service_path):
            zk_connector.create_node(engine_service_path, data=engine_service_data.encode('utf-8'))


    thread = threading.Thread(target=lambda: zk_connector.watch(engine_service_path, callback=reg_callback))
    thread.start()

    uvicorn.run(app, host="0.0.0.0", port=8080)
