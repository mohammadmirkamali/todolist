import { usePlyr } from 'plyr-react';
import * as React from 'react';

const Plyr = (props, ref): React.ReactElement => {
  const { source, options = null, ...rest } = props;
  const raptorRef = usePlyr(ref, { source, options });

  return <video ref={raptorRef} className="plyr-react plyr" {...rest} />; // eslint-disable-line
};

export default React.forwardRef(Plyr);
