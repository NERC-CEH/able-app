import savedSamples from '../saved_samples';
import Sample from './sample';

const Factory = {
  async createSample() {
    const sample = new Sample();
    sample.set('surveyStartTime', sample.metadata.created_on); // this can't be done in defaults
    sample.toggleGPStracking();
    sample.startVibrateCounter();

    savedSamples.add(sample);
    return sample.save();
  },
};

export default Factory;