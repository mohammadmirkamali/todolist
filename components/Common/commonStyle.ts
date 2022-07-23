import styled, { StyledComponent } from '@emotion/styled';
import { Button } from 'antd';
import * as ss from 'styled-system';

export type ComposeType = ss.SpaceProps &
  ss.GridProps &
  ss.ColorProps &
  ss.BackgroundProps &
  ss.LayoutProps &
  ss.BorderProps &
  ss.PositionProps &
  ss.FlexBoxProps &
  ss.ShadowProps &
  ss.TypographyProps & {
    direction?: string;
    cursor?: string;
    centered?: boolean;
  };

export const Compose = ss.compose(
  ss.space,
  ss.background,
  ss.grid,
  ss.color,
  ss.layout,
  ss.border,
  ss.position,
  ss.shadow,
  ss.flexbox,
  ss.typography,
);

export const CommonStyle = (
  component,
  style = '',
): StyledComponent<ComposeType> => styled(component)`
  ${Compose};
  ${ss.background};
  ${ss.grid};
  ${ss.color};
  ${ss.layout};
  ${ss.border};
  ${ss.position};
  ${ss.shadow};
  ${ss.flexbox};
  ${ss.typography};
  ${style};
  direction: ${({ direction }): string => direction};
  cursor: ${({ cursor }): string => cursor};
  display: ${({ centered }): string => centered && 'flex'};
  justify-content: ${({ centered }): string => centered && 'center'};
  align-items: ${({ centered }): string => centered && 'center'};
`;

export const StyledDiv = CommonStyle('div');
export const StyledInput = CommonStyle('input');
export const StyledTextArea = CommonStyle('textarea');
export const StyledLabel = CommonStyle('label');
export const StyledH1 = CommonStyle('h1');
export const StyledH2 = CommonStyle('h2');
export const StyledButton = CommonStyle(Button);
