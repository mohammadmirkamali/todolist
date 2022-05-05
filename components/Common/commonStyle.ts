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
  ss.TypographyProps;

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
  ${Compose}
  ${ss.background}
    ${ss.grid}
    ${ss.color}
    ${ss.layout}
    ${ss.border}
    ${ss.position}
    ${ss.shadow}
    ${ss.flexbox}
    ${ss.typography}
    ${style}
    display:${({ isCenter }): string => isCenter && 'flex'};
  justify-content: ${({ isCenter }): string => isCenter && 'center'};
  align-items: ${({ isCenter }): string => isCenter && 'center'};
`;

export const StyledDiv = CommonStyle('div');
export const StyledButton = CommonStyle(Button);
