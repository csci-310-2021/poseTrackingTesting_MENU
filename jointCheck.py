import json

if __name__ == '__main__':
    file = open('JointData.json', 'r')

    data = json.load(file)

    for frame in data:
        for joint in frame:
            print(joint['name'], joint['x'], joint['y'], joint['score'])
