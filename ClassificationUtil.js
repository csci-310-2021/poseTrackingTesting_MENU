import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const poseOptions = [
  { value: 0, label: "JJ Bottom" },
  { value: 1, label: "JJ Middle" },
  { value: 2, label: "JJ Top" },
  { value: 3, label: "Squat Top" },
  { value: 4, label: "Squat Bottom" },
];

export default class ClassificationUtil {
  constructor() {
    this.model = null;
    this.model_classes = null;
    this.learned_exercises = null;
    this.loadClassification.bind(this);
    this.classifyPose.bind(this);
    this.classifyPoses.bind(this);
    this.getClassifiedPose.bind(this);
    this.getClassifiedPoses.bind(this);
    this.getClassifiedEncodedPose.bind(this);
    this.classifyExercise.bind(this);
    this.trackMovement.bind(this);
    this.trackUndefinedMovement.bind(this);
    this.resetExercises.bind(this);
    this.getClassifiedExercise.bind(this);
    this.getClassifiedExercises.bind(this);
    this.setSmoothingBuffer.bind(this);
    this.setResetLimit.bind(this);

    this.model_url = null;
    this.pose_map = null;
    this.exercise_map = null;
    this.exercise_name_map = null;
    this.exercise_trie = null; //data structure to track exercises being done
    this.movement_window = []; //array - movement_window
    this.classified_pose = null; //string
    this.classified_exercise = null; //Array of exercise name and reps
    this.classified_exercises = null; //object (JSON)

    //Temporary fixes to edge cases and anomalies
    this.framecounter = 0;
    this.sameposecounter = 0;

    this.resetlimit = 20;
    this.smoothingbuffer = 1;
    this.poseMap = [];
    for (let i = 0; i < poseOptions.length; i++) {
      this.poseMap[i] = poseOptions[i].label;
    }
  }

  async loadClassification(model_url) {
    await tf.ready();

    const modelJSON = require("./assets/model.json");
    const modelWeights = require("./assets/group1-shard1of1.bin");
    const modelClasses = this.poseMap;
    this.model = await tf.loadLayersModel(
      bundleResourceIO(modelJSON, modelWeights)
    );
    this.model_classes = modelClasses;

    const exercises = require("./assets/exercises.json");
    this.learned_exercises = {};
    for (var exercise in exercises) {
      this.learned_exercises[exercise] = exercises[exercise];
    }
  }
}
