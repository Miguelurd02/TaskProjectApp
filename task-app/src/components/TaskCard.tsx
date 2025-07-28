import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { taskCardStyles as styles } from '../styles/taskcard.styles';

// Task object type definition
export interface Task {
  title: string;
  description: string;
  createdAt: string;
  completed?: boolean;
  completedAt?: string;
}

// Props expected by the TaskCard component
interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  isExpanded: boolean;
  toggleExpand: () => void;
  cardStyle?: object; // Optional override for the card container style
}

// Visual card component to display a task and its actions
const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
  isExpanded,
  toggleExpand,
  cardStyle
}) => {
  // Format the creation date (YYYY-MM-DD only)
  const formattedDate = task.createdAt.split('T')[0];

  // Format the completed date (YYYY-MM-DD only)
  const formattedCompletedDate = task.completedAt?.split('T')[0];

  return (
    // Main card container with optional external style
    <View style={[styles.card, cardStyle]}>
      {/* Header section with title and action buttons */}
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.actions}>
          {/* Hide action buttons if task is completed */}
          {!task.completed && (
            <>
              {/* Delete button */}
              <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>

              {/* Edit button */}
              <TouchableOpacity onPress={onEdit}>
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>

              {/* Complete button with green background and white icon */}
              <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
                <MaterialIcons name="check" size={28} color="white" />
              </TouchableOpacity>
            </>
          )}

          {/* Expand/collapse toggle */}
          <TouchableOpacity onPress={toggleExpand}>
            <Entypo name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded section with description and date */}
      {isExpanded && (
        <View style={styles.details}>
          <Text style={styles.description}>{task.description}</Text>
          <Text style={styles.date}>Created: {formattedDate}</Text>
          {formattedCompletedDate && (
            <Text style={styles.date}>Completed: {formattedCompletedDate}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default TaskCard;
